---
menus: "main"
title: Shiny
description: This album features visualizations of Shiny, an R framework for building interactive web applications. It highlights key aspects such as reactivity, UI design, and backend logic, showcasing how user inputs dynamically update outputs. From reactive expressions to server-side computations, these visuals provide insights into building efficient and responsive Shiny apps.
categories: ["R", "Code"]
resources:
  - src: CS_Shiny.png
    title: Cheat sheet overview of Shiny for R showing two main parts — User Interface (UI, the body of the app where style and components like text, tables, and visualizations are placed) shown with a fluidPage() code example, and Server (the brain of the app where calculations happen) shown with a renderPlot() code example. The center shows how to combine both with shinyApp(ui = ui, server = server).
    params:
      cover: true
  - src: Shiny_UI.png
    title: Illustration titled 'User Interface' showing the R Shiny UI code using fluidPage() with titlePanel(), sidebarLayout(sidebarPanel()), and mainPanel(). Annotations explain each component — defines the title, defines the left sidebar panel where selection happens, and where to place your plot.
  - src: Shiny_Server.png
    title: Illustration titled 'Server' showing the R Shiny server function code — server <- function(input, output) { output$first_plot <- renderPlot({ ... }) }. A brain icon on the right represents the server as the computational brain of the app.
  - src: Shiny_flow.gif
    title: Animated diagram showing the reactive flow in a Shiny app — how user inputs in the UI trigger reactive expressions on the server, which update outputs that are rendered back in the UI.
    params:
      gif: true
---