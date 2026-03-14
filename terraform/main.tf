terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.5.0"
}

provider "aws" {
  region = var.aws_region
}

# ---------------------------------------------------------------------------
# MIME type lookup for uploaded files
# ---------------------------------------------------------------------------
locals {
  mime_types = {
    "html"  = "text/html"
    "css"   = "text/css"
    "js"    = "application/javascript"
    "json"  = "application/json"
    "png"   = "image/png"
    "jpg"   = "image/jpeg"
    "jpeg"  = "image/jpeg"
    "gif"   = "image/gif"
    "svg"   = "image/svg+xml"
    "ico"   = "image/x-icon"
    "woff"  = "font/woff"
    "woff2" = "font/woff2"
    "ttf"   = "font/ttf"
    "eot"   = "application/vnd.ms-fontobject"
    "map"   = "application/json"
    "txt"   = "text/plain"
    "webp"  = "image/webp"
    "mp4"   = "video/mp4"
    "webm"  = "video/webm"
  }

  # Recursively collect all files in the build directory
  build_files = fileset(var.build_dir, "**/*")
}

# ---------------------------------------------------------------------------
# Upload all build files to S3
# ---------------------------------------------------------------------------
resource "aws_s3_object" "build_files" {
  for_each = local.build_files

  bucket = var.s3_bucket_name
  key    = each.value
  source = "${var.build_dir}/${each.value}"
  etag   = filemd5("${var.build_dir}/${each.value}")

  content_type = lookup(
    local.mime_types,
    reverse(split(".", each.value))[0],
    "application/octet-stream"
  )

  # HTML files must not be cached by browsers so users always get the latest
  # index.html (which references hashed JS/CSS bundles).
  # All other files are content-addressed by CRA (hashed filenames) so they
  # can be cached indefinitely.
  cache_control = endswith(each.value, ".html") ? "no-cache, no-store, must-revalidate" : "public, max-age=31536000, immutable"
}

# ---------------------------------------------------------------------------
# CloudFront cache invalidation — runs after every apply
# ---------------------------------------------------------------------------
resource "null_resource" "cloudfront_invalidation" {
  # Re-run whenever any file in the build changes
  triggers = {
    file_hashes = sha256(join(",", [for f in local.build_files : filemd5("${var.build_dir}/${f}")]))
  }

  depends_on = [aws_s3_object.build_files]

  provisioner "local-exec" {
    command = <<-EOT
      aws cloudfront create-invalidation \
        --distribution-id ${var.cloudfront_distribution_id} \
        --paths "/*"
    EOT
  }
}
