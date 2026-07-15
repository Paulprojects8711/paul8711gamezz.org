---
layout: ../../../../layouts/IonMailWikiLayout.astro
title: "ion-mail CLI Usage"
---

The commands can be split into 3 different categories:

- [Account](#account)
- [Mail](#mail)
- [Folder](#folder)

# Account

## add

Add a new mail account

Usage:

```bash
ion-mail account add
```

## list

Alias: `ls`

Displays a list of all configured accounts. The currently active account (used by default for mail commands) will be highlighted.

Usage:

```bash
ion-mail account list
```

## use

Sets the specified account as the default for all following mail and folder operations.

Arguments:

- `<ACCOUNT>`: The ID or email of the account to activate

Usage:

```bash
ion-mail account use <ACCOUNT>
```

## whoami

Shows details for the account currently in use, including the email address, display name, and connection settings.

Usage:

```bash
ion-mail account whoami
```

## edit

Update specific details like the name or server. If no flags are provided, the currently active account will be edited.

Options:

- `-a, --account <ACCOUNT>`: The ID or email of the account to edit

Usage:

```bash
ion-mail account edit [OPTIONS]
```

## logout

This command removes the account configuration from your local machine. This action is IRREVERSIBLE and does not delete the actual mail on the server.

Options:

- `-a, --account <ACCOUNT>`: The account ID or email to log out of (defaults to the currently active account)

Usage:

```bash
ion-mail account logout [OPTIONS]
```

# Mail

## send

Construct and send a new email

If required fields (to, subject, body) are missing from the flags, the application will prompt for them interactively.

Options:

- `-t, --to <TO>`: Recipient email address(es)
- `-s, --subject <SUBJECT>`: The subject line of the email
- `-b, --body <BODY>`: The message content
- `-a, --attachments <ATTACHMENTS>`: Path to files to attach (can be used multiple times)
- `-y, --yes`: Whether to skip final confirmation

Usage:

```bash
ion-mail mail send [OPTIONS]
```

## read

This command fetches the entire message (sender, subject, body) from the server using the index number provided by the 'folder view' command.

Arguments:

- `<FOLDER>`: The folder where the mail is located
- `<ID>`: The index number shown next to the email in 'folder view'

Usage:

```bash
ion-mail mail read <FOLDER> <ID>
```

## download

This command downloads all attachments into the save folder. If the attachment ID is set, only the attachments with this index will be downloaded.

Arguments:

- `<FOLDER>`: The folder where the email is located
- `<ID>`: The index number shown next to the email in 'folder view'
- `<SAVE_FOLDER>`: The folder to save the attachments to

Options:

- `-a, --attachment-id <ATTACHMENT_ID>`: The index number shown next to the attachments when viewing an email

Usage:

```bash
ion-mail mail download [OPTIONS] <FOLDER> <ID> <SAVE_FOLDER>
```

## search

Search for messages matching a specific sender or query

This command performs a client-side search of your mail. It scans headers, subjects, and body content to find relevant matches.

Options:

- `-q, --query <QUERY>`: The search terms or sender to look for
- `-f, --folder <FOLDER>`: The folder to search within. Defaults to INBOX. Use 'ALL' to search across every folder available on the account.

Usage:

```bash
ion-mail mail search [OPTIONS] --query <QUERY>
```

## move

This command transfers a specific email between folders on the server.

Arguments:

- `<FROM>`: The name of the folder where the message is currently located
- `<TO>`: The name of the destination folder. If the folder does not exist, the command will fail.

Options:

- `-i, --id <ID>`: The index number(s) of the message to move

Usage:

```bash
ion-mail mail move [OPTIONS] <FROM> <TO>
```

## delete

This command permanently deletes a message. This action cannot be undone.

Options:

- `-i, --id <ID>`: The index number(s) of the message(s) to delete. If not provided, multiple messages can be selected interactively.
- `-f, --folder <FOLDER>`: The folder where the message(s) are in

Usage:

```bash
ion-mail mail delete [OPTIONS] --folder <FOLDER>
```

# Folder

## list

Alias: `ls`

Fetches the complete directory tree of your mailbox. This includes standard folders (INBOX, Sent, Trash) and any custom labels or subfolders you have created.

Options:

- `-s, --stats`: Show the number of messages and unread counts for each folder

Note: Enabling this may take longer as the program must query the status of each folder individually.

Usage:

```bash
ion-mail folder list [OPTIONS]
```

## view

This command retrieves the message infos (sender, subject, received date) from the requested folder and displays them in a list. It is the primary way to browse through your Mailboxes.

Arguments:

- `<FOLDER>`: The name of the folder you open

Options:

- `-p, --page-size <PAGE_SIZE>`: Number of messages to show per page (default: 20)

Usage:

```bash
ion-mail folder view [OPTIONS] <FOLDER>
```

## create

This command adds a new mailbox to your account. You can create top-level folders or subfolders by using the server's delimiter (usually a forward slash or a dot).

Arguments:

- `<NAME>`: The name of the new folder to be created. Example: 'Projects' or 'Work/Invoices'. Avoid using reserved names like 'INBOX'.

Options:

- `-p, --parents`: Automatically create parent folders if they don't exist

Usage:

```bash
ion-mail folder create [OPTIONS] <NAME>
```

## delete

This action will delete the folder and, depending on your server configuration, may also delete all messages contained within it. This cannot be undone.

Arguments:

- `[NAME]...`: The name of the folder to delete

Options:

- `-r, --recursive`: Delete the folder even if it contains subfolders
- `-y, --yes`: Skip the confirmation

Usage:

```bash
ion-mail folder delete [OPTIONS] [NAME]...
```

## empty

This command permanently removes every email inside the target folder while keeping the folder structure intact. This is commonly used to clear out 'Trash' or 'Spam' folders.

Arguments:

- `<NAME>`: The name of the folder to empty

Usage:

```bash
ion-mail folder empty <NAME>
```
