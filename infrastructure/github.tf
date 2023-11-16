
# Configure the GitHub Provider
provider "github" {}

data "github_repository" "this" {
  name = "irina-wambach-online-classes"
}
