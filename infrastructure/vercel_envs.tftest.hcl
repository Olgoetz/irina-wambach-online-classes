# vercel_envs.tftest.hcl

variables {
  # You can override these if you want to test with different values
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY      = "test-publishable-key"
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PROD = "prod-publishable-key"
  STRIPE_API_SECRET_KEY                   = "test-secret-key"
  STRIPE_API_SECRET_KEY_PROD              = "prod-secret-key"
  STRIPE_WEBHOOK_SECRET                   = "test-webhook-secret"
  STRIPE_WEBHOOK_SECRET_PROD              = "prod-webhook-secret"
  SENDGRID_API_KEY                        = "test-sendgrid-key"
  SENDGRID_FROM_EMAIL                     = "test@sendgrid.com"
  SENDGRID_BCC_EMAIL                      = "bcc@sendgrid.com"
  SENDGRID_BCC_EMAIL_PROD                 = "bcc-prod@sendgrid.com"
  URL                                     = "https://test.example.com"
}

run "plan_env_vars" {
  command = plan

  assert {
    condition     = vercel_project_environment_variable.stripe_secret.key == "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    error_message = "stripe_secret key is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.stripe_secret_prod.key == "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    error_message = "stripe_secret_prod key is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.stripe_public.key == "STRIPE_API_SECRET_KEY"
    error_message = "stripe_public key is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.stripe_public_prod.key == "STRIPE_API_SECRET_KEY"
    error_message = "stripe_public_prod key is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.url.value == var.URL
    error_message = "URL env var is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.sendgrid_key.value == var.SENDGRID_API_KEY
    error_message = "SENDGRID_API_KEY env var is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.sendgrid_from.value == var.SENDGRID_FROM_EMAIL
    error_message = "SENDGRID_FROM_EMAIL env var is not set correctly"
  }
  assert {
    condition     = vercel_project_environment_variable.sendgrid_bcc.value == var.SENDGRID_BCC_EMAIL
    error_message = "SENDGRID_BCC_EMAIL env var is not set correctly for preview/development"
  }
  assert {
    condition     = vercel_project_environment_variable.sendgrid_bcc_prod.value == var.SENDGRID_BCC_EMAIL_PROD
    error_message = "SENDGRID_BCC_EMAIL env var is not set correctly for production"
  }
}
