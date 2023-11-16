variable "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_PROD" {
  type      = string
  sensitive = true
}
variable "STRIPE_API_SECRET_KEY_PROD" {
  type      = string
  sensitive = true
}
variable "STRIPE_WEBHOOK_SECRET_PROD" {
  type      = string
  sensitive = true
}

variable "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" {
  type      = string
  sensitive = true
}
variable "STRIPE_API_SECRET_KEY" {
  type      = string
  sensitive = true
}
variable "STRIPE_WEBHOOK_SECRET" {
  type      = string
  sensitive = true
}
variable "SENDGRID_API_KEY" {
  type      = string
  sensitive = true
}
variable "SENDGRID_FROM_EMAIL" {
  type = string
}
variable "SENDGRID_BCC_EMAIL" {
  type = string
}
variable "SENDGRID_BCC_EMAIL_PROD" {
  type = string
}
variable "URL" {
  type = string
}
