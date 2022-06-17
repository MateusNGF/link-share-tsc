

export interface IMailService {
  isEmail(email: string): Promise<any>
  send(options : any): Promise<boolean>
}

export namespace IMailService {
  type Address = {name : string,address :  string}
  type TextEncoding = 'quoted-printable' | 'base64';
  type Headers = { [key: string]: string | string[] | { prepared: boolean, value: string } } | Array<{ key: string, value: string }>;
  
  export interface Configuration {
    host :string,
    port : number
    user : string,
    password: string
  }
  export type SendOptions = {
        /** The e-mail address of the sender. All e-mail addresses can be plain 'sender@server.com' or formatted 'Sender Name <sender@server.com>' */
        from?: string | Address | undefined;
        /** An e-mail address that will appear on the Sender: field */
        sender?: string | Address | undefined;
        /** Comma separated list or an array of recipients e-mail addresses that will appear on the To: field */
        to?: string | Address | Array<string | Address> | undefined;
        /** Comma separated list or an array of recipients e-mail addresses that will appear on the Cc: field */
        cc?: string | Address | Array<string | Address> | undefined;
        /** Comma separated list or an array of recipients e-mail addresses that will appear on the Bcc: field */
        bcc?: string | Address | Array<string | Address> | undefined;
        /** An e-mail address that will appear on the Reply-To: field */
        replyTo?: string | Address | undefined;
        /** The message-id this message is replying */
        inReplyTo?: string | Address | undefined;
        /** Message-id list (an array or space separated string) */
        references?: string | string[] | undefined;
        /** The subject of the e-mail */
        subject?: string | undefined;
        /** The plaintext version of the message */
        text?: string | Buffer |  undefined;
        /** The HTML version of the message */
        html?: string | Buffer | undefined;
        /** Apple Watch specific HTML version of the message, same usage as with text and html */
        watchHtml?: string | Buffer | undefined;
        /** AMP4EMAIL specific HTML version of the message, same usage as with text and html. Make sure it is a full and valid AMP4EMAIL document, otherwise the displaying email client falls back to html and ignores the amp part */
        amp?: string | Buffer |  undefined;
        /** iCalendar event, same usage as with text and html. Event method attribute defaults to ‘PUBLISH’ or define it yourself: {method: 'REQUEST', content: iCalString}. This value is added as an additional alternative to html or text. Only utf-8 content is allowed */
        icalEvent?: string | Buffer | undefined;
        /** An object or array of additional header fields */
        headers?: Headers | undefined;
        /** An array of attachment objects */
        attachments?: any | undefined;
        /** optional Message-Id value, random value will be generated if not set */
        messageId?: string | undefined;
        /** optional Date value, current UTC string will be used if not set */
        date?: Date | string | undefined;
        /** optional transfer encoding for the textual parts */
        encoding?: string | undefined;
        /** if set then overwrites entire message output with this value. The value is not parsed, so you should still set address headers or the envelope value for the message to work */
        raw?: string | Buffer | undefined;
        /** set explicitly which encoding to use for text parts (quoted-printable or base64). If not set then encoding is detected from text content (mostly ascii means quoted-printable, otherwise base64) */
        textEncoding?: TextEncoding | undefined;
        /** if set to true then fails with an error when a node tries to load content from URL */
        disableUrlAccess?: boolean | undefined;
        /** if set to true then fails with an error when a node tries to load content from a file */
        disableFileAccess?: boolean | undefined;
        normalizeHeaderKey?(key: string): string;
        priority?: "high"|"normal"|"low" | undefined;
  }
}


