# Developing Secvisogram

<!-- TOC depthFrom:2 depthTo:3 -->

- [Prerequisites & Development Environment](#prerequisites--development-environment)
- [Secvisogram Architecture & Design](#secvisogram-architecture--design)
  - [Overview Diagram](#overview-diagram)
  - [Secvisogram Components](#secvisogram-components)
- [Technology Stack & Libraries](#technology-stack--libraries)
  - [Core stacke & Technology](#core-stacke--technology)
  - [Frameworks & Libraries](#frameworks--libraries)
- [Building Secvisogram](#building-secvisogram)
- [Building & Deploying Secvisogram into Production](#building--deploying-secvisogram-into-production)
  - [Create and Building a release](#create-and-building-a-release)
  - [Deploy to production using nginx](#deploy-to-production-using-nginx)
- [Secvisogram folder structure](#secvisogram-folder-structure)
- [Technical Design](#technical-design)
  - [Code Style & Design Patterns](#code-style--design-patterns)
  - [Form Editor](#form-editor)
  - [Navigation](#navigation)
  - [Validation](#validation)
  - [Data Model](#data-model)
- [Debugging & Testing Secvisogram](#debugging--testing-secvisogram)
  - [Unit Tests](#unit-tests)
  - [View Tests](#view-tests)
  - [Debugging](#debugging)

<!-- /TOC -->

**Note:** Please also refer to [`PREVIEW-TEMPLATING.md`](PREVIEW-TEMPLATING.md) and [`SECURITY-CONSIDERATIONS.md`](SECURITY-CONSIDERATIONS.md) while developing Secvisogram.

## Prerequisites & Development Environment

- VSCode

We use Visual Studio Code to edit the source-code. A vscode-profile is included in this project under `.vscode`. It lists recommended extensions which improve the development experience.

- Node.js (version 14+)

## Secvisogram Architecture & Design

### Overview Diagram

![architecture](DEVELOPMENT-architecture.png)

### Secvisogram Components

**Entities**:
This module exports the entities of the core. Entities are classes that contain logic which is used from multiple use-cases.

**Core**:
Logic which can be abstracted without UI-interaction should be placed here to be tested independently. Ideally this _facade_ exports one method for each use-case of the application.

**Page**:
The page connects the view to the core and maintains the state about the communication.

**View**:
The view is a react-component which defines the main layout of the application.

**View-Components**:
View-components are react-components which provide the actual content for the application.

## Technology Stack & Libraries

### Core stack & Technology

**Typescript:**
Typescript is used to type and document the source code. It is not used as language, but as a statical type-checker only. Types are declared using [Javascript with embedded Typescript source-code comments](TODO://LINK-ZU-DOKU!). This keeps the overall toolchain clean & simple.

**React & Reach-UI:**
React is used to implement the views. This JavaScript library is suitable for mapping data structures to the DOM in the browser and keeping it synchronized when the structure changes. In doing so, it offers an easily customizable template language. In addition, React prevents the accidental insertion of executable code in the DOM and therefore already offers basic protection against cross-site scripting.

Reach-UI is library of primitive component to build accessible user-interfaces.

**Tailwind CSS:**
Tailwind-CSS is a CSS-Framework and library of CSS-classes to be reused across components to keep them adaptable and yet themeable.

### Frameworks & Libraries

TODO: Hier wirklich nur ein halber Satz: Was machts & ggf. warum genau das.

| Domain   | Package    | Description & Justification                                                                                |
| -------- | ---------- | ---------------------------------------------------------------------------------------------------------- |
| Build    | Webpack    | Bundles the source-code and coordinates the build-pipeline with transpilation-tools like postcss and babel |
|          | npm        | Is the package-manager which is used to install dependencies and update or remove them                     |
|          | eslint     | Lints the source-code for its quality and accordance to configured rules                                   |
|          | Dependabot |                                                                                                            |
|          | postcss    |                                                                                                            |
| ??       | tailwind   | …                                                                                                          |
| IDE      | VS Code    | …                                                                                                          |
|          | Prettier   | …                                                                                                          |
| Compiler | Typescript | ES with TS annotations. See [link]()                                                                       |
| Frontend | React      | …                                                                                                          |
| xx       | AJV        | Performs the JSON Schema validation according to the CSAF specification.                                   |

Ich denke ich würde die folgenden Aufführen:

- fortawesome
- reach
- "ajv"
- "mustache"
- "react"
- "babel
- "electron-mocha"
- "eslint"
- "mocha"
- "postcss"
- "tailwindcss"
- "typescript"
- "webpack"
- "xml2js"
- ACE editore

## Building Secvisogram

| Command         | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| `npm run dev`   | Starts the development-server                                      |
| `npm run build` | Builds the application as static assets and places it into `dist/` |

## Building & Deploying Secvisogram into Production

### Create and Building a release

- `npm run build`
- Deploy the content of the `dist` folder to a webserver

TODO: Benjamin

- Requirements (SSL abgesicherter Host)
- Hinweis aus HTTP Headers für Security Hardening (Verweis auf security.md)

### Deploy to production using nginx

TODO: Benjamin

- Verweis bzw. Einbinden der nginx Konfiguration (siehe Issue!)

## Secvisogram folder structure

| Folder             | description                                  |
| ------------------ | -------------------------------------------- |
| `app/dist`         | The output of the build-command              |
| `app/lib`          | Source code                                  |
| `app/node_modules` | Npm dependencies of the app                  |
| `app/scripts`      | Various scripts used by npm-scripts          |
| `app/seeds`        | Sample-files                                 |
| `app/tests`        | Unit-tests                                   |
| `app/vendor`       | Dependencies which aren't packaged using npm |
| `app/viewTests`    | View-tests                                   |

Source files may only access folders that have the same name as themselves and are located at the same file level, e.g.

usage of the `app/lib/shared/Core/entities/DocumentEntity.js` from within `app/lib/shared/Core.js` is only allowed via importing the `app/lib/shared/Core/entities.js`.

Exception are the so-called "shared" folders. They may be used if they are located on the same or higher file level, e.g.

usage of the `app/lib/shared/Core.js` from within `app/lib/SecvisogramPage.js` is allowed because it is contained in a "shared" folder.

## Technical Design

### Form Editor

The "Form Editor"-tab represents the structure of the json-schema. It uses container components to represent objects and arrays and attribute components to represent values. Missing attributes are shown as "Add ..."-buttons which create the respective attribute using its `defaultValue`-function.

New attributes can be added by instantiating a suitable attribute component (e.g. `app/lib/SecvisogramPage/View/EditorTab/shared/TextAttribute.js`).

### Navigation

The various parts of the application are accessible using the tabs. The state, which tab is active, is stored as react-state in `app/lib/SecvisogramPage.js`. Navigation is only disabled if a parse-error occurs in `app/lib/SecvisogramPage/View/JsonEditorTab.js`.

### Validation

The application uses two validations patterns: The fast HTML5 validation and the validation via JSON-schema which kicks in 300ms after editing the document or between tab-changes. The status of the validation is shown in the "Form Editor"-tab, the "JSON Editor"-tab and the "Preview"-tab.

### Sanitizing

The "CSAF Document"-tab uses an algorithm to remove elements which are either invalid, empty or null (see `app/lib/shared/Core/entities/DocumentEntity.js`) and shows the removed paths.

### Data Model

Application state is being held in the `app/lib/SecvisogramPage.js`. It contains state which is needed to coordinate the communication with the `app/lib/shared/Core.js`. Editor state is being held in the `app/lib/SecvisogramPage/View.js`. It contains state of the current editing status of the document.

## Debugging & Testing Secvisogram

### Unit Tests

Unit tests cover logic sitting behind the `Core` component and are written using mocha.

You can run them from CLI via `npm test`. Or you can open http://localhost:8080/tests.html in your browser which provides you the ability to run specific tests only.

These are located in the folder `/app/tests`.

### View Tests

View-tests are a concept to test and design the view and its view-components independently from the _business logic_. To add a view-test for the view, modify the file `app/viewTests/shared/suites/SecvisogramPage.js` and add your test to the `tests` array.

Once you have started the system as described above, you can view the tests at the following URL:

http://localhost:8080/view-tests.html

On this page, there is a drop-down menu in the footer that can be used to select the respective test.
