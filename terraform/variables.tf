variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-2"
}

variable "s3_bucket_name" {
  description = "S3 bucket name where the site is hosted"
  type        = string
  default     = "rac-horizon.com"
}

variable "cloudfront_distribution_id" {
  description = "CloudFront distribution ID to invalidate on deploy"
  type        = string
  default     = "E1ROZ9U2BG5W48"
}

variable "build_dir" {
  description = "Path to the React build output directory"
  type        = string
  default     = "../build"
}
