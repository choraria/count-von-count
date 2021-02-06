function gmailHome() {
  return getGmailCard();
}

function gmailHomeOnChange() {
  const card = getGmailCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true);

  return actionBuilder.build();
}

function getGmailCard() {
  const gmailStats = gmailData();

  const action = CardService.newAction()
    .setFunctionName('gmailHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const refreshButton = CardService.newTextButton()
      .setText('REFRESH')
      .setOnClickAction(action)
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  const header = CardService.newDecoratedText()
    .setText("Gmail stats")
    .setButton(refreshButton);

  const inboxStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/INBOX.png")
    .setIconAltText("INBOX")
    .setTopLabel("INBOX")
    .setText("Total threads: " + gmailStats.INBOX.threadsTotal + " (" + gmailStats.INBOX.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.INBOX.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const unreadStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/UNREAD.png")
    .setIconAltText("UNREAD")
    .setTopLabel("UNREAD")
    .setText("Total threads: " + gmailStats.UNREAD.threadsTotal + " (" + gmailStats.UNREAD.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.UNREAD.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const sentStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SENT.png")
    .setIconAltText("SENT")
    .setTopLabel("SENT")
    .setText("Total threads: " + gmailStats.SENT.threadsTotal + " (" + gmailStats.SENT.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.SENT.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const starredStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/STARRED.png")
    .setIconAltText("STARRED")
    .setTopLabel("STARRED")
    .setText("Total threads: " + gmailStats.STARRED.threadsTotal + " (" + gmailStats.STARRED.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.STARRED.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const draftStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/DRAFT.png")
    .setIconAltText("DRAFT")
    .setTopLabel("DRAFT")
    .setText("Total threads: " + gmailStats.DRAFT.threadsTotal + " (" + gmailStats.DRAFT.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.DRAFT.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const importantStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/IMPORTANT.png")
    .setIconAltText("IMPORTANT")
    .setTopLabel("IMPORTANT")
    .setText("Total threads: " + gmailStats.IMPORTANT.threadsTotal + " (" + gmailStats.IMPORTANT.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.IMPORTANT.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const spamStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SPAM.png")
    .setIconAltText("SPAM")
    .setTopLabel("SPAM")
    .setText("Total threads: " + gmailStats.SPAM.threadsTotal + " (" + gmailStats.SPAM.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.SPAM.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const trashStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/TRASH.png")
    .setIconAltText("TRASH")
    .setTopLabel("TRASH")
    .setText("Total threads: " + gmailStats.TRASH.threadsTotal + " (" + gmailStats.TRASH.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.TRASH.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const chatStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/CHAT.png")
    .setIconAltText("CHAT")
    .setTopLabel("CHAT")
    .setText("Total threads: " + gmailStats.CHAT.threadsTotal + " (" + gmailStats.CHAT.messagesTotal + " messages)")
    .setBottomLabel("Unread threads: " + gmailStats.CHAT.threadsUnread)
    // .setOnClickAction(action)
    .setWrapText(true);

  const footer = CardService.newFixedFooter()
    .setPrimaryButton(CardService.newTextButton()
      .setText('SHARE')
      .setBackgroundColor("#7c4dff")
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://twitter.com/intent/tweet?url=https://workspace.google.com/marketplace/app/count_von_count/222600962484&text=Just%20tried%20Count%20von%20Count%20(Google%20Workspace%20Add-on)%20by%20@schoraria911%20%E2%80%94%20a%20global%20counter%20that%20summarises%20accessible%20stats%20about%20different%20workspace%20services%20and%20found%20some%20interesting%20data%20points.%20Check%20it%20out%20here%20-')))
    .setSecondaryButton(CardService.newTextButton()
      .setText('READ MORE')
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://script.gs/count-von-count-a-google-workspace-add-on-built-using-apps-script/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=gmail')));

  const section = CardService.newCardSection()
    // .setHeader("Gmail stats")
    .addWidget(header)
    .addWidget(inboxStats)
    .addWidget(unreadStats)
    .addWidget(sentStats)
    .addWidget(starredStats)
    .addWidget(draftStats)
    .addWidget(importantStats)
    .addWidget(spamStats)
    .addWidget(trashStats)
    .addWidget(chatStats);

  const card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer)
    .build();

  return card;

}

function gmailData() {
  const mailCount = {};

  const labels = Gmail.Users.Labels.list(`me`).labels
    .filter(label => label.type == 'system')
    .forEach(function (label) {
      const labelName = label.name;
      const labelMeta = Gmail.Users.Labels.get(`me`, labelName);

      mailCount[labelName] = {
        "messagesTotal": labelMeta.messagesTotal,
        "messagesUnread": labelMeta.messagesUnread,
        "threadsTotal": labelMeta.threadsTotal,
        "threadsUnread": labelMeta.threadsUnread,
      };

    });

  console.log(mailCount);
  return mailCount;
}
