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

  docsStats.timeOut ? header.setTopLabel("TOO MANY DOCS!").setBottomLabel("Partial stats fetched.") : header;

  const docsOwned = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SELF.png")
    .setIconAltText("CREATOR")
    .setTopLabel("WRITER")
    .setText(`Created: ${docsStats.timeOut && docsStats.owner > 0 ? "~" + docsStats.owner : docsStats.owner} docs`)
    // .setBottomLabel("---")
    // .setOnClickAction(action)
    .setWrapText(false);

  const docsSharedWithMe = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SHARED.png")
    .setIconAltText("SHARED")
    .setTopLabel("COLLABORATOR")
    .setText(`Shared with me: ${docsStats.timeOut && docsStats.sharedWithMe > 0 ? "~" + docsStats.sharedWithMe : docsStats.sharedWithMe} docs`)
    .setBottomLabel(`Helped: ${docsStats.timeOut && docsStats.helped > 0 ? "~" + docsStats.helped : docsStats.helped} people`)
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
  const start = new Date();

  let docsCount = {};

  let allDocs = {};
  let docOwner = 0;
  let docSharedWithMe = 0;

  let otherOwners = [];

  let timeOut = true;

  do {
    if (!isTimeUp(start)) {
      timeOut = false;
      allDocs = Drive.Files.list({
        q: "mimeType = 'application/vnd.google-apps.document' and ('me' in owners or sharedWithMe = true) and trashed = false",
        pageToken: allDocs.nextPageToken,
        maxResults: 460,
      });

      let items = allDocs.items;
      let docsOwnedByAuthUser = items.filter(item => item.owners[0].isAuthenticatedUser).length;
      let docsSharedWithAuthUser = items.filter(item => !item.owners[0].isAuthenticatedUser);
      docOwner += docsOwnedByAuthUser;
      docSharedWithMe += docsSharedWithAuthUser.length;

      for (var i = 0; i < docsSharedWithAuthUser.length; i++) {
        otherOwners.push(docsSharedWithAuthUser[i].owners[0].emailAddress);
      }
    } else {
      timeOut = true;
      break;
    }
  } while (allDocs.nextPageToken);

  docsCount = {
    "owner": docOwner,
    "sharedWithMe": docSharedWithMe,
    "helped": otherOwners.filter((x, i, a) => a.indexOf(x) === i).length,
    "timeOut": timeOut
  }
  console.log(docsCount);
  return docsCount;
}
