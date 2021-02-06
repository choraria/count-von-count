function driveHome() {
  return getDriveCard();
}

function driveHomeOnChange() {
  const card = getDriveCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true)
    .setNotification(CardService.newNotification()
      .setText("Refreshed (stats were re-fetched)"));

  return actionBuilder.build();
}

function getDriveCard() {
  const driveStats = driveData();

  const action = CardService.newAction()
    .setFunctionName('driveHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const fileCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/FILE.png")
    .setIconAltText("FILE")
    .setTopLabel("FILES")
    .setText("Creator: " + driveStats.fileStats.ownedByMe + " files")
    .setBottomLabel("Shared with me: " + driveStats.fileStats.sharedWithMe + " files")
    .setOnClickAction(action)
    .setWrapText(false);

  const folderCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/FOLDER.png")
    .setIconAltText("FOLDER")
    .setTopLabel("FOLDERS")
    .setText("Creator: " + driveStats.folderStats.ownedByMe + " folders")
    .setBottomLabel("Shared with me: " + driveStats.folderStats.sharedWithMe + " folders")
    .setOnClickAction(action)
    .setWrapText(false);

  const imageCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/IMAGE.png")
    .setIconAltText("IMAGE")
    .setTopLabel("IMAGES")
    .setText("Maker: " + driveStats.imageStats.ownedByMe + " images")
    .setBottomLabel("Shared with me: " + driveStats.imageStats.sharedWithMe + " images")
    .setOnClickAction(action)
    .setWrapText(false);

  const audioCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/AUDIO.png")
    .setIconAltText("AUDIO")
    .setTopLabel("AUDIO")
    .setText("Maker: " + driveStats.audioStats.ownedByMe + " audio files")
    .setBottomLabel("Shared with me: " + driveStats.audioStats.sharedWithMe + " audio files")
    .setOnClickAction(action)
    .setWrapText(false);

  const videoCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/VIDEO.png")
    .setIconAltText("VIDEO")
    .setTopLabel("VIDEOS")
    .setText("Maker: " + driveStats.videoStats.ownedByMe + " videos")
    .setBottomLabel("Shared with me: " + driveStats.videoStats.sharedWithMe + " videos")
    .setOnClickAction(action)
    .setWrapText(false);

  const scriptCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SCRIPT.png")
    .setIconAltText("SCRIPT")
    .setTopLabel("SCRIPTS")
    .setText("Builder: " + driveStats.scriptStats.ownedByMe + " scripts")
    .setBottomLabel("Shared with me: " + driveStats.scriptStats.sharedWithMe + " scripts")
    .setOnClickAction(action)
    .setWrapText(false);

  const drawingCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/DRAWING.png")
    .setIconAltText("DRAWING")
    .setTopLabel("DRAWINGS")
    .setText("Builder: " + driveStats.drawingStats.ownedByMe + " drawings")
    .setBottomLabel("Shared with me: " + driveStats.drawingStats.sharedWithMe + " drawings")
    .setOnClickAction(action)
    .setWrapText(false);

  const siteCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SITES.png")
    .setIconAltText("SITE")
    .setTopLabel("SITES")
    .setText("Builder: " + driveStats.siteStats.ownedByMe + " sites")
    .setBottomLabel("Shared with me: " + driveStats.siteStats.sharedWithMe + " sites")
    .setOnClickAction(action)
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
        .setUrl('https://script.gs/count-von-count/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=drive')));

  const section = CardService.newCardSection()
    .setHeader("Drive stats")
    .addWidget(fileCard)
    .addWidget(folderCard)
    .addWidget(imageCard)
    .addWidget(audioCard)
    .addWidget(videoCard)
    .addWidget(scriptCard)
    .addWidget(drawingCard)
    .addWidget(siteCard);

  const card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer)
    .build();

  return card;
}

function driveData() {
  let driveStats = {};

  let stuffOwnedByMe = {};

  let filesOwnerdByMe = 0;
  let foldersOwnedByMe = 0;
  let imagesOwnedByMe = 0;
  let audiosOwnedByMe = 0;
  let videosOwnedByMe = 0;
  let scriptsOwnedByMe = 0;
  let drawingsOwnedByMe = 0;
  let sitesOwnedByMe = 0;

  do {
    stuffOwnedByMe = Drive.Files.list({
      q: "'me' in owners and trashed = false",
      pageToken: stuffOwnedByMe.nextPageToken,
      maxResults: 1000,
    });
    let items = stuffOwnedByMe.items;

    filesOwnerdByMe = filesOwnerdByMe + items.length;
    foldersOwnedByMe = foldersOwnedByMe + items.filter(item => item.mimeType == "application/vnd.google-apps.folder").length;
    imagesOwnedByMe = imagesOwnedByMe + items.filter(item => item.mimeType.includes("image")).length;
    audiosOwnedByMe = audiosOwnedByMe + items.filter(item => item.mimeType.includes("audio")).length;
    videosOwnedByMe = videosOwnedByMe + items.filter(item => item.mimeType.includes("video")).length;
    scriptsOwnedByMe = scriptsOwnedByMe + items.filter(item => item.mimeType == "application/vnd.google-apps.script").length;
    drawingsOwnedByMe = drawingsOwnedByMe + items.filter(item => item.mimeType == "application/vnd.google-apps.drawing").length;
    sitesOwnedByMe = sitesOwnedByMe + items.filter(item => item.mimeType == "application/vnd.google-apps.site").length;

  } while (stuffOwnedByMe.nextPageToken);

  driveStats["fileStats"] = {
    "ownedByMe": filesOwnerdByMe
  };
  driveStats["folderStats"] = {
    "ownedByMe": foldersOwnedByMe
  };
  driveStats["imageStats"] = {
    "ownedByMe": imagesOwnedByMe
  };
  driveStats["audioStats"] = {
    "ownedByMe": audiosOwnedByMe
  };
  driveStats["videoStats"] = {
    "ownedByMe": videosOwnedByMe
  };
  driveStats["scriptStats"] = {
    "ownedByMe": scriptsOwnedByMe
  };
  driveStats["drawingStats"] = {
    "ownedByMe": drawingsOwnedByMe
  };
  driveStats["siteStats"] = {
    "ownedByMe": sitesOwnedByMe
  };

  let stuffSharedWithMe = {};

  let filesSharedWithMe = 0;
  let foldersSharedWithMe = 0;
  let imagesSharedWithMe = 0;
  let audiosSharedWithMe = 0;
  let videosSharedWithMe = 0;
  let scriptsSharedWithMe = 0;
  let drawingsSharedWithMe = 0;
  let sitesSharedWithMe = 0;

  do {
    stuffSharedWithMe = Drive.Files.list({
      q: "sharedWithMe = true and trashed = false",
      pageToken: stuffSharedWithMe.nextPageToken,
      maxResults: 1000,
    });
    let items = stuffSharedWithMe.items;

    filesSharedWithMe = filesSharedWithMe + items.length;
    foldersSharedWithMe = foldersSharedWithMe + items.filter(item => item.mimeType == "application/vnd.google-apps.folder").length;
    imagesSharedWithMe = imagesSharedWithMe + items.filter(item => item.mimeType.includes("image")).length;
    audiosSharedWithMe = audiosSharedWithMe + items.filter(item => item.mimeType.includes("audio")).length;
    videosSharedWithMe = videosSharedWithMe + items.filter(item => item.mimeType.includes("video")).length;
    scriptsSharedWithMe = scriptsSharedWithMe + items.filter(item => item.mimeType == "application/vnd.google-apps.script").length;
    drawingsSharedWithMe = drawingsSharedWithMe + items.filter(item => item.mimeType == "application/vnd.google-apps.drawing").length;
    sitesSharedWithMe = sitesSharedWithMe + items.filter(item => item.mimeType == "application/vnd.google-apps.site").length;

  } while (stuffSharedWithMe.nextPageToken);

  driveStats["fileStats"]["sharedWithMe"] = filesSharedWithMe;
  driveStats["folderStats"]["sharedWithMe"] = foldersSharedWithMe;
  driveStats["imageStats"]["sharedWithMe"] = imagesSharedWithMe;
  driveStats["audioStats"]["sharedWithMe"] = audiosSharedWithMe;
  driveStats["videoStats"]["sharedWithMe"] = videosSharedWithMe;
  driveStats["scriptStats"]["sharedWithMe"] = scriptsSharedWithMe;
  driveStats["drawingStats"]["sharedWithMe"] = drawingsSharedWithMe;
  driveStats["siteStats"]["sharedWithMe"] = sitesSharedWithMe;

  console.log(driveStats);
  return driveStats;
}
