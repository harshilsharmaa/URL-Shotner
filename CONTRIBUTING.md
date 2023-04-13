# Contributing Guidelines

Thank you for your interest in contributing to this project! We welcome all contributions, including but not limited to bug reports, feature requests, documentation improvements, and code contributions.

Before getting started, please read the following guidelines to ensure that your contribution is in line with our project goals and values.

## Code of Conduct
This project has adopted a Code of Conduct that we expect all contributors to adhere to. Please review the Code of Conduct before contributing to this project.

## How to Contribute

### Reporting Bugs

If you encounter a bug in the project, please create a new issue in our issue tracker. Please include a clear and detailed description of the bug, steps to reproduce the issue, and any relevant screenshots or error messages.

### Requesting Features
If you have an idea for a new feature or enhancement, please create a new issue in our issue Tracker. Please include a clear and detailed description of the feature, including use cases and any relevant design or technical considerations.

### Contributing Code
We welcome contributions in the form of pull requests. Before submitting a pull request, please make sure that your changes are:

In line with our project goals and values
Properly documented and tested
Compliant with our coding standards
To submit a pull request, please follow these steps:

Fork the repository and create a new branch for your changes.
Make your changes and commit them to your branch.
Submit a pull request to the main repository with a clear and descriptive title and description of your changes.
Please note that all pull requests will be reviewed by a project maintainer before being merged.

### Configuration
Create a config.env file in the config folder with the following keys and their respective values:
```
MONGO_URI=<Your MONGO_URI>
JWT_SECRET="<Your Secret>"
CLIENT_ID="<Your Google OAuth Client ID>"
CLIENT_SECRET="<Your Google OAuth Client Secret>"
RAZORPAY_API_KEY=<Your Razorpay API Key>
RAZORPAY_API_SECRET=<Your Razorpay API Secret>

```

Make sure to replace with your own values.

Note that the config.env file should not be committed to version control to keep your sensitive information secure.

### Documentation
We welcome improvements to our documentation, including both technical documentation and user-facing documentation. To contribute to our documentation, please submit a pull request with your proposed changes.

### License
By contributing to this project, you agree that your contributions will be licensed under the [MIT License](LICENSE)

Thank you for contributing to our project!
