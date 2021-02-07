function calendarHome() {
  return getCalendarCard();
}

function calendarHomeOnChange() {
  const card = getCalendarCard();

  const actionBuilder = CardService.newActionResponseBuilder()
    .setNavigation(CardService.newNavigation().updateCard(card))
    .setStateChanged(true);

  return actionBuilder.build();
}

function getCalendarCard() {
  const calendarStats = calendarData();

  const action = CardService.newAction()
    .setFunctionName('calendarHomeOnChange')
    .setLoadIndicator(CardService.LoadIndicator.SPINNER);

  const refreshButton = CardService.newTextButton()
    .setText('REFRESH')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  const header = CardService.newDecoratedText()
    .setText("Calendar stats")
    .setButton(refreshButton);

  calendarStats.timeOut ? header.setTopLabel("TOO MANY INVITES!").setBottomLabel("Partial stats fetched.") : header;

  const attendedStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/ACCEPTED.png")
    .setIconAltText("CONFIRMED")
    .setTopLabel("YES")
    .setText(`Accepted: ${calendarStats.timeOut && calendarStats.attended > 0 ? "~" + calendarStats.attended : calendarStats.attended} invites`)
    // .setBottomLabel("---")
    // .setOnClickAction(action)
    .setWrapText(false);

  const declinedStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/CANCELLED.png")
    .setIconAltText("CANCELLED")
    .setTopLabel("NO")
    .setText(`Cancelled: ${calendarStats.timeOut && calendarStats.declined > 0 ? "~" + calendarStats.declined : calendarStats.declined} invites`)
    // .setBottomLabel("---")
    // .setOnClickAction(action)
    .setWrapText(false);

  const maybeesStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/TENTATIVE.png")
    .setIconAltText("TENTATIVE")
    .setTopLabel("MAY BE")
    .setText(`Were unsure about: ${calendarStats.timeOut && calendarStats.maybees > 0 ? "~" + calendarStats.maybees : calendarStats.maybees} invites`)
    .setBottomLabel("API BUG")
    // .setOnClickAction(action)
    .setWrapText(false);

  const hostedStats = CardService.newDecoratedText()
    .setIconUrl("https://raw.githubusercontent.com/schoraria911/google-apps-script/master/Random/Icons/SELF.png")
    .setIconAltText("HOSTED")
    .setTopLabel("CREATED")
    .setText(`Hosted: ${calendarStats.timeOut && calendarStats.hosted > 0 ? "~" + calendarStats.hosted : calendarStats.hosted} meetings`)
    // .setBottomLabel("---")
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
        .setUrl('https://script.gs/count-von-count-a-google-workspace-add-on-built-using-apps-script/?utm_source=count-von-count&utm_medium=workspace-addon&utm_campaign=calendar')));

  const section = CardService.newCardSection()
    // .setHeader("Calendar stats")
    .addWidget(header)
    .addWidget(attendedStats)
    .addWidget(declinedStats)
    .addWidget(maybeesStats)
    .addWidget(hostedStats);

  const card = CardService.newCardBuilder()
    .addSection(section)
    .setFixedFooter(footer)
    .build();

  return card;
}

function calendarData() {
  const start = new Date();

  let eventsCount = {};
  let events = {};

  let attended = 0;
  let declined = 0;
  let maybees = 0;
  let hosted = 0;

  let timeOut = true;

  do {
    if (!isTimeUp(start)) {
      timeOut = false;
      events = Calendar.Events.list("primary", {
        pageToken: events.nextPageToken,
        maxResults: 2500,
      });

      let items = events.items;
      attended += items.filter(event => event.status == "confirmed").length;
      declined += items.filter(event => event.status == "cancelled").length;
      maybees += items.filter(event => event.status == "tentative").length;
      hosted += items.filter(function (event) {
        let selfEvents;
        try {
          selfEvents = event.creator.self;
          if (selfEvents == true) {
            return event;
          }
        } catch (e) {
          // console.log({ e });
        }
      }).length;
    } else {
      timeOut = true;
      break;
    }
  } while (events.nextPageToken);

  eventsCount = {
    "attended": attended,
    "declined": declined,
    "maybees": maybees,
    "hosted": hosted,
    "timeOut": timeOut
  }

  console.log(eventsCount);
  return eventsCount;
}
