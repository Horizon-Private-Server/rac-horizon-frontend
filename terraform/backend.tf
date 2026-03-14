terraform {
  backend "s3" {
    bucket = "horizon-terraform-ci-state"
    key    = "rac-horizon-frontend/terraform.tfstate"
    region = "us-east-2"
  }
}
