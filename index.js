const nodemailer = require("nodemailer");
// if (!process.env.NODE_ENV) require("dotenv").config();

class BoCartero {
  constructor() {
    const { SMTP_SERVICE, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } =
      process.env;

    // Basic safeguard:
    if (!SMTP_SERVICE)
      throw new Error(
        "BoCartero: SMTP_SERVICE (String) must be defined as env variable."
      );

    // Different approaches for hotmail / non-hotmail:
    // TODO: this could maybe be re-done with a generic class that gets the transport() method redefined in specialized classes?
    let transportOptions;
    if (SMTP_SERVICE === "hotmail") {
      // transportOptions is simpler for hotmail:
      transportOptions = {
        service: "hotmail",
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
      };
    } else {
      // Safeguards part 2 (non-hotmail case):
      if (!SMTP_HOST)
        throw new Error(
          "BoCartero: SMTP_HOST (String) must be defined as env variable."
        );
      if (!SMTP_PORT)
        throw new Error(
          "BoCartero: SMTP_PORT (Integer) must be defined as env variable."
        );
      if (!SMTP_USER)
        throw new Error(
          "BoCartero: SMTP_USER (String) must be defined as env variable."
        );
      if (!SMTP_PASSWORD)
        throw new Error(
          "BoCartero: SMTP_PASSWORD (String) must be defined as env variable."
        );

      // transportOptions is a bit more complex for non-hotmail (generic SMTP):
      transportOptions = {
        service: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        },
        tls: {
          ciphers: "SSLv3",
        },
      };
    }

    // Back to a common path for hotmail and non-hotmail:
    this.smtpTransport = nodemailer.createTransport(transportOptions);
  }

  async sendEmail(
    subject,
    html = text, // If html was not provided, default to text
    emailTo,
    text = "NOTE: this email was sent in HTML format only." // if text was not provided. default to a clarification message (so we make it visible)
  ) {
    const { SMTP_EMAIL_FROM, SMTP_DEFAULT_EMAIL_TO } = process.env;

    // Safeguards:
    if (!SMTP_EMAIL_FROM)
      throw new Error(
        "BoCartero: SMTP_EMAIL_FROM (String) must be defined as env variable."
      );
    if (!SMTP_DEFAULT_EMAIL_TO)
      throw new Error(
        "BoCartero: SMTP_DEFAULT_EMAIL_TO (Integer) must be defined as env variable."
      );
    // Safeguards/

    var mailOptions = {
      from: SMTP_EMAIL_FROM,
      to: emailTo ? emailTo : SMTP_DEFAULT_EMAIL_TO,
      subject,
      text,
      html,
    };

    try {
      const info = await this.smtpTransport.sendMail(mailOptions);
      return info;
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  BoCartero,
};

// for stand alone (manual) tests:
// async function main() {
//   const cartero = new BoCartero();
//   cartero.sendEmail("Test 002", "<p>This is message 002</p>");
// }

// main();
