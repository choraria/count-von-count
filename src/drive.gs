function driveHome() {
  return getDriveCard();
}

function driveHomeOnChange() {
  const card = getDriveCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true);

  return actionBuilder.build();
}

function getDriveCard() {
  const driveStats = driveData();

  const action = CardService.newAction()
    .setFunctionName('driveHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const refreshButton = CardService.newTextButton()
    .setText('REFRESH')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  const header = CardService.newDecoratedText()
    .setText("Drive stats")
    .setButton(refreshButton);

  driveStats.timeOut.status ? header.setTopLabel("TOO MANY FILES!").setBottomLabel("Partial stats fetched.") : header;

  const fileCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/FILE.png")
    .setIconAltText("FILE")
    .setTopLabel("FILES")
    .setText(`Creator: ${driveStats.timeOut.status && driveStats.fileStats.ownedByMe > 0 ? "~" + driveStats.fileStats.ownedByMe : driveStats.fileStats.ownedByMe} files`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.fileStats.sharedWithMe > 0 ? "~" + driveStats.fileStats.sharedWithMe : driveStats.fileStats.sharedWithMe} files`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const folderCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/FOLDER.png")
    .setIconAltText("FOLDER")
    .setTopLabel("FOLDERS")
    .setText(`Creator: ${driveStats.timeOut.status && driveStats.folderStats.ownedByMe > 0 ? "~" + driveStats.folderStats.ownedByMe : driveStats.folderStats.ownedByMe} folders`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.folderStats.sharedWithMe > 0 ? "~" + driveStats.folderStats.sharedWithMe : driveStats.folderStats.sharedWithMe} folders`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const imageCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/IMAGE.png")
    .setIconAltText("IMAGE")
    .setTopLabel("IMAGES")
    .setText(`Maker: ${driveStats.timeOut.status && driveStats.imageStats.ownedByMe > 0 ? "~" + driveStats.imageStats.ownedByMe : driveStats.imageStats.ownedByMe} images`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.imageStats.sharedWithMe > 0 ? "~" + driveStats.imageStats.sharedWithMe : driveStats.imageStats.sharedWithMe} images`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const audioCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/AUDIO.png")
    .setIconAltText("AUDIO")
    .setTopLabel("AUDIO")
    .setText(`Maker: ${driveStats.timeOut.status && driveStats.audioStats.ownedByMe > 0 ? "~" + driveStats.audioStats.ownedByMe : driveStats.audioStats.ownedByMe} audio files`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.audioStats.sharedWithMe > 0 ? "~" + driveStats.audioStats.sharedWithMe : driveStats.audioStats.sharedWithMe} audio files`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const videoCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/VIDEO.png")
    .setIconAltText("VIDEO")
    .setTopLabel("VIDEOS")
    .setText(`Maker: ${driveStats.timeOut.status && driveStats.videoStats.ownedByMe > 0 ? "~" + driveStats.videoStats.ownedByMe : driveStats.videoStats.ownedByMe} videos`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.videoStats.sharedWithMe > 0 ? "~" + driveStats.videoStats.sharedWithMe : driveStats.videoStats.sharedWithMe} videos`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const scriptCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SCRIPT.png")
    .setIconAltText("SCRIPT")
    .setTopLabel("SCRIPTS")
    .setText(`Builder: ${driveStats.timeOut.status && driveStats.scriptStats.ownedByMe > 0 ? "~" + driveStats.scriptStats.ownedByMe : driveStats.scriptStats.ownedByMe} scripts`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.scriptStats.sharedWithMe > 0 ? "~" + driveStats.scriptStats.sharedWithMe : driveStats.scriptStats.sharedWithMe} scripts`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const drawingCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/DRAWING.png")
    .setIconAltText("DRAWING")
    .setTopLabel("DRAWINGS")
    .setText(`Builder: ${driveStats.timeOut.status && driveStats.drawingStats.ownedByMe > 0 ? "~" + driveStats.drawingStats.ownedByMe : driveStats.drawingStats.ownedByMe} drawings`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.drawingStats.sharedWithMe > 0 ? "~" + driveStats.drawingStats.sharedWithMe : driveStats.drawingStats.sharedWithMe} drawings`)
    // .setOnClickAction(action)
    .setWrapText(false);

  const siteCard = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SITES.png")
    .setIconAltText("SITE")
    .setTopLabel("SITES")
    .setText(`Builder: ${driveStats.timeOut.status && driveStats.siteStats.ownedByMe > 0 ? "~" + driveStats.siteStats.ownedByMe : driveStats.siteStats.ownedByMe} sites`)
    .setBottomLabel(`Shared with me: ${driveStats.timeOut.status && driveStats.siteStats.sharedWithMe > 0 ? "~" + driveStats.siteStats.sharedWithMe : driveStats.siteStats.sharedWithMe} sites`)
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
        .setUrl('https://script.gs/count-von-count-a-google-workspace-add-on-built-using-apps-script/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=drive')));

  const section = CardService.newCardSection()
    // .setHeader("Drive stats")
    .addWidget(header)
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
  const start = new Date();

  let driveStats = {};

  let allMyStuff = {};

  let filesOwnedByMe = 0;
  let foldersOwnedByMe = 0;
  let imagesOwnedByMe = 0;
  let audiosOwnedByMe = 0;
  let videosOwnedByMe = 0;
  let scriptsOwnedByMe = 0;
  let drawingsOwnedByMe = 0;
  let sitesOwnedByMe = 0;

  let filesSharedWithMe = 0;
  let foldersSharedWithMe = 0;
  let imagesSharedWithMe = 0;
  let audiosSharedWithMe = 0;
  let videosSharedWithMe = 0;
  let scriptsSharedWithMe = 0;
  let drawingsSharedWithMe = 0;
  let sitesSharedWithMe = 0;

  let timeOut = true;

  do {
    if (!isTimeUp(start)) {
      timeOut = false;
      allMyStuff = Drive.Files.list({
        q: "('me' in owners or sharedWithMe = true) and trashed = false",
        pageToken: allMyStuff.nextPageToken,
        maxResults: 460,
      });

      let items = allMyStuff.items;

      let foldersType = items.filter(item => item.mimeType == "application/vnd.google-apps.folder");
      let imagesType = items.filter(item => item.mimeType.includes("image"));
      let audiosType = items.filter(item => item.mimeType.includes("audio"));
      let videosType = items.filter(item => item.mimeType.includes("video"));
      let scriptsType = items.filter(item => item.mimeType == "application/vnd.google-apps.script");
      let drawingsType = items.filter(item => item.mimeType == "application/vnd.google-apps.drawing");
      let sitesType = items.filter(item => item.mimeType == "application/vnd.google-apps.site");

      let filesOwnedByAuthUser = items.filter(item => item.owners[0].isAuthenticatedUser).length;
      let foldersOwnedByAuthUser = foldersType.filter(item => item.owners[0].isAuthenticatedUser).length;
      let imagesOwnedByAuthUser = imagesType.filter(item => item.owners[0].isAuthenticatedUser).length;
      let audiosOwnedByAuthUser = audiosType.filter(item => item.owners[0].isAuthenticatedUser).length;
      let videosOwnedByAuthUser = videosType.filter(item => item.owners[0].isAuthenticatedUser).length;
      let scriptsOwnedByAuthUser = scriptsType.filter(item => item.owners[0].isAuthenticatedUser).length;
      let drawingsOwnedByAuthUser = drawingsType.filter(item => item.owners[0].isAuthenticatedUser).length;
      let sitesOwnedByAuthUser = sitesType.filter(item => item.owners[0].isAuthenticatedUser).length;

      filesOwnedByMe += filesOwnedByAuthUser;
      foldersOwnedByMe += foldersOwnedByAuthUser;
      imagesOwnedByMe += imagesOwnedByAuthUser;
      audiosOwnedByMe += audiosOwnedByAuthUser;
      videosOwnedByMe += videosOwnedByAuthUser;
      scriptsOwnedByMe += scriptsOwnedByAuthUser;
      drawingsOwnedByMe += drawingsOwnedByAuthUser;
      sitesOwnedByMe += sitesOwnedByAuthUser;

      filesSharedWithMe += (items.length - filesOwnedByAuthUser);
      foldersSharedWithMe += (foldersType.length - foldersOwnedByAuthUser);
      imagesSharedWithMe += (imagesType.length - imagesOwnedByAuthUser);
      audiosSharedWithMe += (audiosType.length - audiosOwnedByAuthUser);
      videosSharedWithMe += (videosType.length - videosOwnedByAuthUser);
      scriptsSharedWithMe += (scriptsType.length - scriptsOwnedByAuthUser);
      drawingsSharedWithMe += (drawingsType.length - drawingsOwnedByAuthUser);
      sitesSharedWithMe += (sitesType.length - sitesOwnedByAuthUser);
    } else {
      timeOut = true;
      break;
    }
  } while (allMyStuff.nextPageToken);

  driveStats["fileStats"] = {
    "ownedByMe": filesOwnedByMe,
    "sharedWithMe": filesSharedWithMe
  };
  driveStats["folderStats"] = {
    "ownedByMe": foldersOwnedByMe,
    "sharedWithMe": foldersSharedWithMe
  };
  driveStats["imageStats"] = {
    "ownedByMe": imagesOwnedByMe,
    "sharedWithMe": imagesSharedWithMe
  };
  driveStats["audioStats"] = {
    "ownedByMe": audiosOwnedByMe,
    "sharedWithMe": audiosSharedWithMe
  };
  driveStats["videoStats"] = {
    "ownedByMe": videosOwnedByMe,
    "sharedWithMe": videosSharedWithMe
  };
  driveStats["scriptStats"] = {
    "ownedByMe": scriptsOwnedByMe,
    "sharedWithMe": scriptsSharedWithMe
  };
  driveStats["drawingStats"] = {
    "ownedByMe": drawingsOwnedByMe,
    "sharedWithMe": drawingsSharedWithMe
  };
  driveStats["siteStats"] = {
    "ownedByMe": sitesOwnedByMe,
    "sharedWithMe": sitesSharedWithMe
  };
  driveStats["timeOut"] = {
    "status": timeOut
  };

  console.log(driveStats);
  return driveStats;
}
