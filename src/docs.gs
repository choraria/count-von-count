function docsHome() {
  return getDocsCard();
}

function docsHomeOnChange() {
  const card = getDocsCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true);

  return actionBuilder.build();
}

function getDocsCard() {
  const docsStats = docsData();

  const action = CardService.newAction()
    .setFunctionName('docsHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const refreshButton = CardService.newTextButton()
      .setText('REFRESH')
      .setOnClickAction(action)
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  const header = CardService.newDecoratedText()
    .setText("Docs stats")
    .setButton(refreshButton);

  const docsOwned = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SELF.png")
    .setIconAltText("CREATOR")
    .setTopLabel("WRITER")
    .setText("Created: " + docsStats.owner + " docs")
    // .setBottomLabel("---")
    // .setOnClickAction(action)
    .setWrapText(false);

  const docsSharedWithMe = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SHARED.png")
    .setIconAltText("SHARED")
    .setTopLabel("COLLABORATOR")
    .setText("Shared with me: " + docsStats.sharedWithMe + " docs")
    .setBottomLabel("Helped: " + docsStats.helped + " people")
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
        .setUrl('https://script.gs/count-von-count-a-google-workspace-add-on-built-using-apps-script/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=docs')));

  const section = CardService.newCardSection()
    // .setHeader("Docs stats")
    .addWidget(header)
    .addWidget(docsOwned)
    .addWidget(docsSharedWithMe);

  const card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer)
    .build();

  return card;
}

function docsData() {
  let docsCount = {};

  let docsOwnedByMe = {};
  let docOwner = 0;

  do {
    docsOwnedByMe = Drive.Files.list({
      q: "mimeType = 'application/vnd.google-apps.document' and 'me' in owners and trashed = false",
      pageToken: docsOwnedByMe.nextPageToken,
    });
    docOwner = docOwner + docsOwnedByMe.items.length;
  } while (docsOwnedByMe.nextPageToken);

  docsCount["owner"] = docOwner;

  let docsShared = {};
  let docSharedWithMe = 0;
  let otherOwners = [];

  do {
    docsShared = Drive.Files.list({
      q: "mimeType = 'application/vnd.google-apps.document' and sharedWithMe = true and trashed = false",
      pageToken: docsShared.nextPageToken,
    });
    let sharedItems = docsShared.items;

    for (var i = 0; i < sharedItems.length; i++) {
      otherOwners.push(sharedItems[i].owners[0].emailAddress);
    }

    docSharedWithMe = docSharedWithMe + sharedItems.length;
  } while (docsShared.nextPageToken);

  docsCount["sharedWithMe"] = docSharedWithMe;
  docsCount["helped"] = otherOwners.filter((x, i, a) => a.indexOf(x) === i).length;

  console.log(docsCount);
  return docsCount;
}
