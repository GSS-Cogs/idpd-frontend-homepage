# IDPD Frontend Homepage

This project serves as our GOV.UK frontend catalogue for our IDPD API, containing all our datasets. The live site can be accessed at [https://staging.idpd.uk/](https://staging.idpd.uk/).

## Built With

- [React](https://reactjs.org/) 18.2.0
- [Next.js](https://nextjs.org/) 14.0.3
- [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) ^4.7.0
- [TypeScript](https://www.typescriptlang.org/) 5.1.6

## Related Projects

This microservice works together with [IDPD Frontend Datasets](https://github.com/GSS-Cogs/idpd-frontend-datasets). Together, they make up [https://staging.idpd.uk/](https://staging.idpd.uk/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repo

```sh
git clone https://github.com/GSS-Cogs/idpd-frontend-homepage.git
```

2. Install Yarn packages
   `yarn install`

3. Create a .env.local file in the root directory and set your environment variables:

```sh
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
# or
NEXT_PUBLIC_BACKEND_URL=https://staging.idpd.uk
```

If you're using the `localhost:8000` URL, you'll need to port forward to our `idpd-api-poc` kubernetes pod to port 8000 via terminal: `kubectl port-forward <pod> 8000:8000`.

If you're using the staging URL, you'll also need to provide `NEXT_PRIVATE_USERNAME` and `NEXT_PRIVATE_PASSWORD` variables.

## Usage

### Development

To run the application in development mode, use the following command:

```sh
make debug
# or
yarn dev
```

This will start the Next.js app in development mode. You can view the application by opening [http://localhost:3000](http://localhost:3000) in your web browser.

### Production

To build the application for production, use the following command:

```sh
make build
```

This will create a production build of the Next.js app.

To start the application in production mode, use the following command:

```sh
make start
```

This will start the Next.js app in production mode. You can view the application by opening [http://localhost:3000](http://localhost:3000) in your web browser.
