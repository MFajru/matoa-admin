# Matoa Admin React Assignment

For this assignment, your task is to develop a web application on the admin side that facilitates the management of products for an online shop website using React.

## Links

- Figma Mockup: [matoa redesign](https://www.figma.com/file/SqKVE46j7Wi7nLiR8r5Duj/matoa-redesign?type=design&node-id=0%3A1&mode=design&t=yhKnqTY525SWrdDu-1)

## Requirements

- Fork Repository (shared project) name: **assignment-react**
- Create a new branch '**dev**' after the initial commit and only develop on the dev branch!
- Please do frequent commit
- For styling, you can use any CSS Library such as Tailwind or Styled Component to make the user comfortable with the design. **Do not use full fledged React component libraries such as Material UI, React Bootstrap, Chakra UI, Ant Design, etc.**
  - All styling should be in **SASS** / **Tailwind** / **Styled Component**
  - Using **Styled Component** will have bonus point
- Use state management. Feel free to use Zustand or Redux Toolkit or Context.
   - Using **Redux Toolkit** will have bonus point
- Add README.md and put these information:
  - Project description
  - How to setup and run project
  - _Screenshot of the App (don't forget to resize the image)_
- Only use libraries or frameworks mentioned in this document.
- Submit your project by making a merge request (MR) from **dev** to **master** branch, don't merge it by yourself! Please also attach screenshots of test coverage on your MR description
- Make all testing on **Product Detail page**
- **Finish all the requirements** then do the unit test coverage

## Features

1. Website Application Navigation

   1. `[easy]` Make navigation as the following route:
      - Home using path `/`
      - Product List using path `/product`
      - Edit Product using path `/product/:id/edit`
      - Add New Product using path `/product/add`
      - Product Detail using path `/product/:id`
      - Login using path `/auth/login`
      - Signup using path `/auth/signup`
   2. `[easy]` If user attempts to visit unhandled route, it will display not found page
   3. `[medium]` If not logged in, user unable to access all route except login and signup

2. Authentication

   1. `[easy]` User may login by input username (email) and password
   2. `[easy]` User may register by input full name, email, and password
   3. `[easy]` If user have logged in, user cannot access login and register page
   4. `[easy]` If user have not logged in, user cannot access home, transfer, topup, and games page
   5. `[medium]` User able to logout. Make sure the token is revoked and the user cannot go back to the previous page

3. Sign Up Page

   1. `[easy]` The Sign Up page should include input fields for full name, email, and password.
   2. `[easy]` Provide a clear call-to-action button to submit the registration form.
   3. `[easy]` Ensure that the user is redirected to the login page after a successful registration.
   4. `[medium]` Implement validation checks for the input fields, providing meaningful error messages for users.
   5. `[easy]` The page should be mobile responsive

4. Log In Page

   1. `[easy]` The Log In page should include input fields for email and password.
   2. `[easy]` Implement a prominent login button to initiate the login process.
   3. `[easy]` Upon successful login, redirect the user to the product list page.
   4. `[medium]` Include error handling mechanisms for unsuccessful login attempts, providing relevant feedback to the user.
   5. `[easy]` Consider implementing UI for "Remember Me" or "Forgot Password" for enhanced user experience.
   6. `[easy]` The page should be mobile responsive

5. Product List Page

   1. `[easy]` Display button to go to Add Product page
   2. `[medium]` In product list table show the data as per requirement:
      - ID
      - Name
      - Category
      - Prices
      - Discount
      - Each row will display action buttons to go to edit and to delete the corresponding product
   3. `[hard]` Filter for product list data:

      - By Name (case insensitive) by text input

   4. `[hard]` Sorting for product list data:
      - Sort by Name (ascending or descending) toggle between sort by clicking on the Name column header
   5. `[hard]` Create pagination with max 9 data per page
   6. Notes:
      - First time page load, it will fetch **9 last product and order by Name descending**
      - Please make **loading component** when waiting for data to be loaded, the design of component is up to you, you can use spinner or skeleton.

6. Add New Product Page (multi steps form)
   1. `[hard]` Page 1 (Product Description) of the form will have the following requirements:
      - `Product Name`: required, minimum 10 characters
      - `Price`: required, numeric, minimum 100, maximum 999,999,999
      - `Discount`: numeric, minimum 1, maximum 100
      - `Weight`,:Length and Width: required, minimum 1, maximum 99
      - `Category`: Dropdown select:
        - Digital Watches
        - Classic Watches
        - Smart Watches
      - Have a button that will navigate to form for steps number 2
   2. `[hard]` Page 2 (Model) of the form will have the following requirements:
      - `Model Name`: required, minimum 10 characters
      - `Product Images`:
        - required min. 1 image and maximum 5 images
        - click upload button to open file select
        - the format of the image must be png or jpeg
        - If more then 3 images added, the images list will be horizontal scrolling
      - `Stock`: required, numeric, minimum 1, maximum 999
      - Can add multiple model by clicking on `Add Model` button
      - The back button will go to form for steps number 1
      - The next button will go to form for steps number 3
   3. `[hard]` Page 3 of the form will have the following requirements:
      - `All Text Areas`: required, minimum 5 characters, maximum 500 characters
      - The submit button will save the data to the backend
7. Product Detail Page
   1. `[easy]` Product Detail page will show theese data:
      - Product Name
      - Discount
      - Price
      - Quantity
      - Details:
        - Material
        - Case
        - Movement
        - Dial
        - Hand
        - Important to Note
   2. `[medium]` Show product images and can change the image by clicking on the product images list
   3. `[easy]` The back button will navigate to the Product List page
   4. `[medium]` Testing with 100% coverage **Product Detail page**
8. Edit Product Page
   1. `[medium]` The form will be the same with Add new product multi steps form
   2. `[hard]` When each form rendered, all of the existing data will be filled in each fields
9. Delete Product
   1. `[medium]` Make Delete feature, after click delete button modal confirmation will appear.
   2. `[medium]` if user click yes, then make request to delete product data. while on process for deleting data, render loading component.
   3. `[easy]` if user click no, close codal confirmation.

## Backend Setup

- For products data will be saved in JSON Server
- You must upload the file to [cloudinary API ](https://cloudinary.com/documentation/image_upload_api_reference) (prefer using unsigned cloudinary).
- Save the cloudinary link to the JSON server

For simplicity you can upload the file when you click upload file button, but you can approach another way by uploading when submit button clicked after all the file has been uploaded to cloudinary, you can pass the url to json-server. it's up to you to choose the way of uploading. you must comment the reason why you choose the way [see [**notes**](#notes)]. (don't forget to give loading ui when uploading image to cloudinary and submit data to json-server). Disable submit button if there is error validated in data.

cases:

- If successful, the data will be sent to the JSON server with the following format:

```json
{
  "name": "Product name",
  "price": 200000,
  "weight": 10,
  "width": 10,
  "length": 10,
  "category": "1",
  "discount": 0,
  "caseDetail": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
  "dial": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "hand": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "material": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "importantNote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "movement": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  "model": [
    {
      "name": "cream",
      "picture": "image url from cloudinary",
      "qty": 20,
      "photos": ["image url from cloudinary", "image url from cloudinary"]
    },
    {
      "name": "jati",
      "picture": "image url from cloudinary",
      "qty": 10,
      "photos": ["image url from cloudinary", "image url from cloudinary"]
    }
  ]
}
```
