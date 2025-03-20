#!/usr/bin/env node
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cpSync, readFileSync, writeFileSync } from 'fs';
import { existsSync, mkdirSync } from 'fs';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const new_template_folder_name = "konnect-apps";
// console.log("file name", __filename)
// console.log("dir name", __dirname)

// Get the target project name
// const projectName = process.argv[2] || 'konnect-apps';
// const targetPath = join(process.cwd(), projectName);

// Prompt the user for app names
async function getUserInput() { // todo: in validate i have to check the app name exists in konnectify app list
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'app1name',
            message: 'Enter the first application name:',
            validate: input => input.trim() ? true : 'Application name cannot be empty.'
        },
        {
            type: 'input',
            name: 'app1id',
            message: 'Enter the first application id:',
            validate: input => input.trim() ? true : 'Application id cannot be empty.'
        },
        {
            type: 'input',
            name: 'app2name',
            message: 'Enter the second application name:',
            validate: input => input.trim() ? true : 'Application name cannot be empty.'
        },
        {
            type: 'input',
            name: 'app2id',
            message: 'Enter the second application id:',
            validate: input => input.trim() ? true : 'Application id cannot be empty.'
        },
        {
            type: 'input',
            name: 'baseUrl',
            message: 'Enter the base url:',
            validate: input => input.trim() ? true : 'Base url cannot be empty.'
        }
    ]);
    return answers;
}

// Function to replace placeholders in files
function replacePlaceholders(filePath, app1name, app2name) {
    let content = readFileSync(filePath, 'utf8');
    // console.log("iparams path",filePath);
    content = content.replace(/%%APP1_NAME%%/g, capitalizeFirstLetter(app1name));
    content = content.replace(/%%APP2_NAME%%/g, capitalizeFirstLetter(app2name));
    writeFileSync(filePath, content, 'utf8');
}

// Capitalize the string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

// Create the project folder and update the files
async function createProject() {
    const { app1name, app2name, baseUrl, app1id, app2id } = await getUserInput();
    const targetPath = join(process.cwd(), new_template_folder_name);
    const templatePath = join(__dirname, '../template');
    // console.log("cwd", process.cwd());
    // console.log("target path", targetPath) // where the template is going to create
    // console.log("template path", templatePath) 
// /*
    if (existsSync(targetPath)) {
        console.error(`Error: The directory "${template_name}" already exists.`);
        process.exit(1);
    }

    mkdirSync(targetPath, { recursive: true });
    cpSync(templatePath, targetPath, { recursive: true });

    // Replace placeholders in iparams.html
    const htmlFilePath = join(targetPath, 'config','iparams.html');
    if (existsSync(htmlFilePath)) {
        replacePlaceholders(htmlFilePath, app1name, app2name);
    }
    // Replace placeholders in iparams.html
    const appHtmlFilePath = join(targetPath, 'app','index.html');
    if (existsSync(appHtmlFilePath)) {
        replacePlaceholders(appHtmlFilePath, app1name, app2name);
    }
    // Replace placeholders in iparams.js
    const iparamsJsPath = join(targetPath, 'config', 'assets', 'scripts', 'iparams.js');
    const serverJsPath = join(targetPath, 'server', 'server.js');
    if (existsSync(iparamsJsPath)) {
        let content = readFileSync(iparamsJsPath, 'utf8');
        let serverFile = readFileSync(serverJsPath, 'utf-8');
        const base_url = /const base_url\s*=\s*["'].*?["'];/g;
        const app1_id = /const app1_id\s*=\s*["'].*?["'];/g;
        const app2_id = /const app2_id\s*=\s*["'].*?["'];/g;
        const app1_name = /const app1_name\s*=\s*["'].*?["'];/g;
        const app2_name = /const app2_name\s*=\s*["'].*?["'];/g;
        content = content.replace(base_url, `const base_url=${JSON.stringify(baseUrl)}`);
        content = content.replace(app1_id, `const app1_id=${JSON.stringify(app1id)}`);
        content = content.replace(app2_id, `const app2_id=${JSON.stringify(app2id)}`);
        content = content.replace(app1_name, `const app1_name=${JSON.stringify(app1name.toLowerCase())}`);
        content = content.replace(app2_name, `const app2_name=${JSON.stringify(app2name.toLowerCase())}`);
        serverFile = serverFile.replace(base_url, `const base_url=${JSON.stringify('https://'+baseUrl)}`);
        writeFileSync(iparamsJsPath, content, 'utf8');
        writeFileSync(serverJsPath, serverFile, 'utf8');
    }
// */
    console.log(`Project "${new_template_folder_name}" has been created successfully!\n`);
    console.log(`\nTo get started:\n`);
    console.log(`  cd ${new_template_folder_name}`);
    console.log(`  fdk run`);
}

// Run the function
createProject();