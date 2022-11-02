[![Foo](https://res.cloudinary.com/wdpj/image/upload/c_scale,w_50/v1636746639/web-design-pablo-juele/logos/wdpj-logo_ddlpop.png)](https://pablojuele.com/)

# BoCartero

BoCartero is a a very very simple Node.js + NodeMailer wrapper class created to be used in node backends.

The intention behind it is to simply NodeMailer use and keep its impact on code readability to a minimmum (by relying on process.env variables and configuring NodeMailer transport directly from i.e. the projects's _.env_ file).

## Installation

Use Node Package Manager [npm](https://docs.npmjs.com/cli/v6/commands/npm) to install BoCartero.

```bash
cd <path to folder containing your package.json file>

npm install bocartero
```

## Usage

```javascript
const { BoCartero } = require("bocartero");

/*** IMPORTANT!
 *
 * To keep code minimal, BoCartero relies on the following env variables.
 * These need to be defined (i.e. in your .env file, or in other ways).
 *
 * If any of the required env vars is not defined (i.e. not found in the process.env object)
 * the constructor and/or the sendEmail function will throw an exception.
 *
 * SMTP_SERVICE='hotmail' # If not using outlook.com, set this to anything else - NOTE: it HAS to be present.
 * SMTP_HOST='<your SMTP host>' ### Not needed with 'hotmail' option.
 * SMTP_PORT=<your SMTP host's Port> ### Not needed with 'hotmail' option.
 * SMTP_USER="<your username to sign in to SMTP server>"
 * SMTP_PASSWORD="<password for that username>"
 *
 * Also, sendEmail function needs these to be defined:
 *
 * SMTP_EMAIL_FROM='<email account that appears to have sent these emails>'
 * SMTP_DEFAULT_EMAIL_TO='<default address to send all emails to (if not overriden in sendEmail method)>'
 *
 ****/

// Get the env vars:
if (!process.env.NODE_ENV) require("dotenv").config();

const mailman = new BoCartero();

// You can rely on default emailTo & text:
mailman.sendEmail("test email A", "<p>Hello world</p>");

// Or you can override the default emailTo:
mailman.sendEmail("test email B", "<p>Hello world!</p>", "john@doe.com");

// The 4th parameter is the text content of the email.
// If not provided it will default to "NOTE: this email was sent in HTML format only."
mailman.sendEmail(
  "test email C",
  "<p>Hello world!</p>",
  "john@doe.com",
  "Hello world!" // (this is what you'll see if your email client does not render the HTML content)
);
```

## Why the rather anachronistic emphasis on _hotmail_?

I did a few websites for non-profit organizations and needed a free SMTP server. I found out Gmail is (more secure but) extremely annoying. Even if you do things by the book, it's heuristic analysis might reject your request to send an email at potentially unpredictable times (at least in my tests). So I tried different options (such as Mailgun and others) but in the end the least complicated was good old 'hotmail' (Outlook.com free accounts).

So as far as defaults go, I default to this. _History will judge me! :)_

But of course you can configure your own SMTP server (I know - my referring to that as 'non-hotmail' is weird!)

Just set env variable **SMTP_SERVICE** to something other than 'hotmail'. It doesn't matter what (the actual value won't be used unless it's 'hotmail') but **_you do have to define it_**. It has to be present in your process.env object (to make sure you didn't omit it by mistake - this made sense at some point and is still the way it goes for now!)

¯\\_(ツ)_/¯

## License

[![MIT](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/220px-MIT_logo.svg.png)](https://choosealicense.com/licenses/mit/)
