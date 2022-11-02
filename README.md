![WDPJ home](https://res.cloudinary.com/wdpj/image/upload/c_scale,w_150/v1636746639/web-design-pablo-juele/logos/wdpj-logo_ddlpop.png "WDPJ home")
![WDPJ home](https://res.cloudinary.com/wdpj/image/upload/c_scale,w_150/v1638578520/web-design-pablo-juele/logos/wdpj-qr-code.png "WDPJ home")

# boCartero

A simple NodeMailer wrapper to use in node backends.
It simplifies NodeMailer use by relying on process.env variables.

**NOTE: if these variables are NOT defined (for instance in a .env file imported using 'dotenv') then creating a BoCartero class and/or the sendEmail method will trhow exceptions.**

## Env variables required

### Always required

| env variable               | Notes                                                                                                                                                                                                                                                                                                                                     |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **SMTP_SERVICE**           | For now, this is used to determine whether we're using 'hotmail' (simplified config) or a generic SMTP server. <br><br>SMTP_SERVICE='hotmail'<br>Will trigger the simpler hotmail config (with less mandatory env variables)<br><br>Any other value will trigger generic SMTP config (and will require more env variables to be defined). |
| **SMTP_EMAIL_FROM**        | **All** emails will be sent _from_ this address                                                                                                                                                                                                                                                                                           |
| **SMTP*DEFAULT_EMAIL_TO*** | This sets a _default_ 'to' address (i.e. where emails will be sent). **It can be overruled** by providing an emailTo parameter to sendEmail function.                                                                                                                                                                                     |

### Required for hotmail use (i.e. with an outlook.com free account)

| env variable      | Notes                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **SMTP_USER**     | the username we will use to sign in to the SMTP server (i.e. your outlook.com account)        |
| **SMTP_PASSWORD** | The password for that account (just the normal password you'd use if you signed in manually). |

### Required for non-hotmail use (generic SMTP server)

| env variable      | Notes                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------- |
| **SMTP_USER**     | the username we will use to sign in to the SMTP server (i.e. your outlook.com account)        |
| **SMTP_PASSWORD** | The password for that account (just the normal password you'd use if you signed in manually). |
| **SMTP_HOST**     | the url for the SMTP server (i.e. 'mail.yourdomain.com').                                     |
| **SMTP_PORT**     | The port where that SMTP server is listening (i.e. 587)                                       |

## USAGE:

```
const mailman = new BoCartero('<your SMTP host>', <it's SMTP port>, <your username>, <your password>, <default 'from' email address>, <default 'to' address can be changed @ send time>)
```

### For instance:

```

const BoCartero = require('bocartero');
const mailman = new BoCartero('mail.yourdomain.com', 993, 'jdoe', '#jdoespa55word67as58as576asf', 'website-mailer-robot@doeindustries.com', 'websitee-contact-inbox@doeindustries.com);

mailman.sendEmail('test email', '<p>Hello world!</p>') // will use default emailTo & text!

// Or:
mailman.sendEmail('test email', '<p>Hello world!</p>', 'blablah@gmail.com') // overrides default emailTo!
```

## Why hotmail? (Is that still a thing?!?!?!?)

I did a few websites for non-profit organizations and needed a free SMTP server. I found out Gmail is (more secure but) extremely annoying. Even if you do things by the book, it's heuristic analysis of requests might reject your request to send an email. I tried different options (mailgun and others) but in the end the least complicated was good ole 'hotmail' (Outlook.com free accounts).

So as far as defaults go, I default to this. _History will judge me!_ But of course you can configure your own SMTP server (I know, it's weird to refer to that as 'non-hotmail'!) Just set env variable **SMTP_SERVICE** to something other than 'hotmail'. It doesn't matter what (the actual value won't be used unless it's 'hotmail') but **_you do have to define it_**. It has to be present in your process.env object (to make sure you didn't ommit it by mistake).
