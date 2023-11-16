terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.15"
    }
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

