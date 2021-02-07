function sheetsHome() {
  return getSheetsCard();
}

function sheetsHomeOnChange() {
  const card = getSheetsCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true);

  return actionBuilder.build();
}

function getSheetsCard() {
  const sheetsStats = sheetsData();

  const action = CardService.newAction()
    .setFunctionName('sheetsHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const refreshButton = CardService.newTextButton()
    .setText('REFRESH')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  const header = CardService.newDecoratedText()
    .setText("Sheets stats")
    .setButton(refreshButton);

  const sheetsOwned = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SELF.png")
    .setIconAltText("CREATOR")
    .setTopLabel("CREATOR")
    .setText("Built: " + sheetsStats.owner + " sheets")
    // .setBottomLabel("---")
    // .setOnClickAction(action)
    .setWrapText(false);

  const sheetsSharedWithMe = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SHARED.png")
    .setIconAltText("SHARED")
    .setTopLabel("COLLABORATOR")
    .setText("Shared with me: " + sheetsStats.sharedWithMe + " sheets")
    .setBottomLabel("Helped: " + sheetsStats.helped + " people")
    // .setOnClickAction(action)
    .setWrapText(false);

  const footer = CardService.newFixedFooter()
    .setPrimaryButton(CardService.newTextButton()
      .setText('SHARE')
      .setBackgroundColor("#7c4dff")
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://twitter.com/intent/tweet?url=https://workspace.google.com/marketplace/app/count_von_count/222600962484&text=Just%20tried%20Count%20von%20Count%20(Google%20Workspace%20Add-on)%20by%20@schoraria911%20%E2%80%94%20a%20global%20counter%20that%20summarises%20accessible%20stats%20about%20different%20workspace%20services%20and%20found%20some%20interesting%20data%20points.%20Check%20it%20out%20here%20-')))
    .setSecondaryButton(CardService.newTextButton()
      .setText('READ MORE')
      .setOpenLink(CardService.newOpenLink()
        .setUrl('https://script.gs/count-von-count-a-google-workspace-add-on-built-using-apps-script/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=sheets')));

  const section = CardService.newCardSection()
    // .setHeader("Sheets stats")
    .addWidget(header)
    .addWidget(sheetsOwned)
    .addWidget(sheetsSharedWithMe);

  const card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer)
    .build();

  return card;
}

function sheetsData() {
  const start = new Date();

  let sheetsCount = {};

  let allSheets = {};
  let sheetOwner = 0;
  let sheetSharedWithMe = 0;

  let otherOwners = [];

  do {
    allSheets = Drive.Files.list({
      q: "mimeType = 'application/vnd.google-apps.spreadsheet' and ('me' in owners or sharedWithMe = true) and trashed = false",
      pageToken: allSheets.nextPageToken,
      maxResults: 460,
    });

    let items = allSheets.items;
    let sheetsOwnedByAuthUser = items.filter(item => item.owners[0].isAuthenticatedUser).length;
    let sheetsSharedWithAuthUser = items.filter(item => !item.owners[0].isAuthenticatedUser);
    sheetOwner += sheetsOwnedByAuthUser;
    sheetSharedWithMe += sheetsSharedWithAuthUser.length;

    for (var i = 0; i < sheetsSharedWithAuthUser.length; i++) {
      otherOwners.push(sheetsSharedWithAuthUser[i].owners[0].emailAddress);
    }

  } while (allSheets.nextPageToken);

  sheetsCount = {
    "owner": sheetOwner,
    "sharedWithMe": sheetSharedWithMe,
    "helped": otherOwners.filter((x, i, a) => a.indexOf(x) === i).length
  }
  console.log(sheetsCount);
  return sheetsCount;
}
