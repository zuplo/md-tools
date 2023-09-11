import {
  copyFileSync,
  readFileSync,
  writeFileSync,
} from "fs";
import { resolve } from "path";
import { format } from "prettier";
const githubRef = process.argv[2];

const outPkgPath = resolve("./dist/package.json");

const pkgPath = resolve("./package.json");

const json = readFileSync(pkgPath, "utf-8");
const pkg = JSON.parse(json);
const version = githubRef.replace("refs/tags/v", "");
pkg.version = version;

delete pkg.scripts;
delete pkg.type;
delete pkg.dependencies;
delete pkg.devDependencies;

const outJson = JSON.stringify(pkg);
const formattedJson = await format(outJson, {
  parser: "json-stringify",
});
writeFileSync(outPkgPath, formattedJson, "utf-8");

copyFileSync(resolve("./.npmignore"), resolve("./dist/.npmignore"));
copyFileSync(resolve("./.npmrc"), resolve("./dist/.npmrc"));
copyFileSync(
  resolve("./package-lock.json"),
  resolve("./dist/package-lock.json")
);
