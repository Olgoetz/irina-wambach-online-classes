terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 4"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6"
    }
  }
}

