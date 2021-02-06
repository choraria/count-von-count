function slidesHome() {
  return getSlidesCard();
}

function slidesHomeOnChange() {
  const card = getSlidesCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true);

  return actionBuilder.build();
}

function getSlidesCard() {
  const slidesStats = slidesData();

  const action = CardService.newAction()
    .setFunctionName('slidesHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const refreshButton = CardService.newTextButton()
      .setText('REFRESH')
      .setOnClickAction(action)
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  const header = CardService.newDecoratedText()
    .setText("Slides stats")
    .setButton(refreshButton);

  const slidesOwned = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SELF.png")
    .setIconAltText("CREATOR")
    .setTopLabel("PRESENTER")
    .setText("Created: " + slidesStats.owner + " slides")
    // .setBottomLabel("---")
    // .setOnClickAction(action)
    .setWrapText(false);

  const slidesSharedWithMe = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SHARED.png")
    .setIconAltText("SHARED")
    .setTopLabel("COLLABORATOR")
    .setText("Shared with me: " + slidesStats.sharedWithMe + " slides")
    .setBottomLabel("Helped: " + slidesStats.helped + " people")
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
        .setUrl('https://script.gs/count-von-count-a-google-workspace-add-on-built-using-apps-script/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=slides')));

  const section = CardService.newCardSection()
    // .setHeader("Slides stats")
    .addWidget(header)
    .addWidget(slidesOwned)
    .addWidget(slidesSharedWithMe);

  const card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer)
    .build();

  return card;
}

function slidesData() {
  let slidesCount = {};

  let slidesOwnedByMe = {};
  let slideOwner = 0;

  do {
    slidesOwnedByMe = Drive.Files.list({
      q: "mimeType = 'application/vnd.google-apps.presentation' and 'me' in owners and trashed = false",
      pageToken: slidesOwnedByMe.nextPageToken,
    });
    slideOwner = slideOwner + slidesOwnedByMe.items.length;
  } while (slidesOwnedByMe.nextPageToken);

  slidesCount["owner"] = slideOwner;

  let slidesShared = {};
  let slidesSharedWithMe = 0;
  let otherOwners = [];

  do {
    slidesShared = Drive.Files.list({
      q: "mimeType = 'application/vnd.google-apps.presentation' and sharedWithMe = true and trashed = false",
      pageToken: slidesShared.nextPageToken,
    });
    let sharedItems = slidesShared.items;

    for (var i = 0; i < sharedItems.length; i++) {
      otherOwners.push(sharedItems[i].owners[0].emailAddress);
    }

    slidesSharedWithMe = slidesSharedWithMe + sharedItems.length;
  } while (slidesShared.nextPageToken);

  slidesCount["sharedWithMe"] = slidesSharedWithMe;
  slidesCount["helped"] = otherOwners.filter((x, i, a) => a.indexOf(x) === i).length;

  console.log(slidesCount);
  return slidesCount;
}
