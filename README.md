# Urily - URL Shortener

Urily is a web-based URL shortening platform that allows you to shorten and manage your links with ease. With a simple user interface and powerful features, Urily is perfect for marketers, bloggers, and anyone who wants to share links more effectively.

## Features
- Shorten your URLs with a 64-bit hash string of 7 characters.
- Save your URLs for later use.
- Delete or edit your URLs anytime.
- Generate QR codes for your shortened links.
- View analytics such as the number of clicks and the browser type.
- Organize your links into groups.
- Invite people via UTM and get points.
- Protect your links with passwords.
- User authentication using Email-password and Google OAuth2.0.
- Payment integration.

## Tech Stacks
MongoDB, JavaScript, Node.js, Express.js, React.js, Redux, RESTful APIs, Chart.js, HTML, CSS

## How it works
When a user shortens a URL, a 64-bit hash string of 7 characters is generated randomly. The system then checks if the generated hash is already present in the database. If it is not unique, the process is repeated until a unique hash is generated. The long URL and the hash are then saved in the database. When a user clicks on the shortened URL, they are redirected to the original URL.


## Screenshots

### Home
![w1](https://user-images.githubusercontent.com/71216106/231768837-68d204c5-51cb-41f2-9fee-dd75b077de24.PNG)

### Dhashboard
![w2](https://user-images.githubusercontent.com/71216106/231768997-13994045-516a-4533-af16-2f9713dad08f.PNG)

### My URLs
![w3](https://user-images.githubusercontent.com/71216106/231769119-12736545-bf4d-44c4-a807-bf61113c30eb.PNG)

### QR Code
![qr](https://user-images.githubusercontent.com/71216106/231772756-cc553b84-8fdd-47c5-a94d-6f1074d673eb.PNG)

### Profile
![w4](https://user-images.githubusercontent.com/71216106/231769292-fb1c4260-d282-4345-ad4e-2296ea1e4758.PNG)

### Subscription Plan
![w5](https://user-images.githubusercontent.com/71216106/231769437-3ab434ff-77ab-4aa0-b7d9-6c89e2f3d94d.PNG)

### Place Order
![Plceorder](https://user-images.githubusercontent.com/71216106/231775113-01cc0544-4e4a-45f8-bdce-fab65d21b41b.PNG)

### Checkout
![checkout](https://user-images.githubusercontent.com/71216106/231775219-17cdf2d1-df45-465d-8ae4-a239c2546a06.PNG)

### Invite People
![w6](https://user-images.githubusercontent.com/71216106/231769555-8ba96597-2ead-4682-bf08-2e5cf68757e9.PNG)

### Group URLs
![w7](https://user-images.githubusercontent.com/71216106/231769677-ef1b1fbe-1dc8-4972-b4df-4f1ad725540b.PNG)

### Login
![w8](https://user-images.githubusercontent.com/71216106/231771929-f1ffb75e-46df-4b40-abea-c8943061662a.PNG)

## Installation
To run the application, you'll need to have Node.js and MongoDB installed on your machine. Follow the steps below to get started:

1. Clone the repository to your local machine.
2. Navigate to the project directory and run npm install to install the necessary dependencies.
3. Start the server by running npm start

## Contributing
Contributions to the project are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request in diffrent branch.

## License
This project is licensed under the MIT License - see the [MIT License](LICENSE) file for details.
