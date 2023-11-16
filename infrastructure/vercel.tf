provider "vercel" {

}

resource "vercel_project" "this" {
  name      = "irina-wambach-online-classes"
  framework = "nextjs"


  git_repository = {
    type              = "github"
    repo              = data.github_repository.this.full_name
    production_branch = "prod"
  }

  vercel_authentication = {
    protect_production = false
  }

}

resource "vercel_project_domain" "prod" {
  project_id = vercel_project.this.id
  domain     = split("//", var.URL)[1]


}


## ENVs

resource "vercel_project_environment_variable" "stripe_secret_prod" {
  project_id = vercel_project.this.id
  key        = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  value      = var.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PROD
  target     = ["production"]

}
resource "vercel_project_environment_variable" "stripe_public_prod" {
  project_id = vercel_project.this.id
  key        = "STRIPE_API_SECRET_KEY"
  value      = var.STRIPE_API_SECRET_KEY_PROD
  target     = ["production"]
}
resource "vercel_project_environment_variable" "stripe_webhook_secret_prod" {
  project_id = vercel_project.this.id
  key        = "STRIPE_WEBHOOK_SECRET"
  value      = var.STRIPE_WEBHOOK_SECRET_PROD
  target     = ["production"]
}

resource "vercel_project_environment_variable" "sendgrid_key" {
  project_id = vercel_project.this.id
  key        = "SENDGRID_API_KEY"
  value      = var.SENDGRID_API_KEY
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "sendgrid_from" {
  project_id = vercel_project.this.id
  key        = "SENDGRID_FROM_EMAIL"
  value      = var.SENDGRID_FROM_EMAIL
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "sendgrid_bcc" {
  project_id = vercel_project.this.id
  key        = "SENDGRID_BCC_EMAIL"
  value      = var.SENDGRID_BCC_EMAIL
  target     = ["preview", "development"]
}
resource "vercel_project_environment_variable" "sendgrid_bcc_prod" {
  project_id = vercel_project.this.id
  key        = "SENDGRID_BCC_EMAIL"
  value      = var.SENDGRID_BCC_EMAIL_PROD
  target     = ["production"]
}
resource "vercel_project_environment_variable" "url" {
  project_id = vercel_project.this.id
  key        = "URL"
  value      = var.URL
  target     = ["production", "preview", "development"]
}


resource "vercel_project_environment_variable" "stripe_secret" {
  project_id = vercel_project.this.id
  key        = "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  value      = var.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  target     = ["preview", "development"]

}
resource "vercel_project_environment_variable" "stripe_public" {
  project_id = vercel_project.this.id
  key        = "STRIPE_API_SECRET_KEY"
  value      = var.STRIPE_API_SECRET_KEY
  target     = ["preview", "development"]
}
resource "vercel_project_environment_variable" "stripe_webhook_secret" {
  project_id = vercel_project.this.id
  key        = "STRIPE_WEBHOOK_SECRET"
  value      = var.STRIPE_WEBHOOK_SECRET
  target     = ["preview", "development"]
}
