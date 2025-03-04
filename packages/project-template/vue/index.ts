import { GeneratorClass } from "@mb-cli/cli/lib/generator";
import { renderFile, getDirAllFiles } from "@mb-cli/utils/lib";
import path from "path";

import { GeneratorRenderTemplate } from "../index";

class GeneratorVue extends GeneratorRenderTemplate {
  onInit = async (api: GeneratorClass): Promise<void> => {
    await this.setTemplate(api);
    if(api.templateName === "admin") {
      api.pkg = {
        scripts: {
          "dev": "vite --mode base --host",
          "build": "run-p type-check \"build-only -- --mode {1}\" --",
          "preview": "vite preview --mode",
          "build-only": "vite build",
          "type-check": "vue-tsc --build",
          "lint": "eslint . --fix \"src/**/*.{js,ts,tsx,vue,html}\"",
          "format": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,vue,html,md}\"",
          "style": "stylelint --fix \"**/*.{vue,less,postcss,css,scss}\" --cache --cache-location node_modules/.cache/stylelint/",
          "test:unit": "vitest",
          "prepare": "husky",
          "plop": "plop",
          "npm-check": "npx npm-check-updates -i --format group",
          "release": "standard-version"
        },
        dependencies: {
          "@iconify/vue": "^4.2.0",
          "@wangeditor/editor": "^5.1.23",
          "@wangeditor/editor-for-vue": "^5.1.12",
          "@zxcvbn-ts/core": "^3.0.4",
          "axios": "^1.7.9",
          "cropperjs": "^1.6.2",
          "driver.js": "^1.3.1",
          "echarts": "^5.5.1",
          "echarts-wordcloud": "^2.1.0",
          "element-plus": "^2.9.0",
          "lodash-es": "^4.17.21",
          "mitt": "^3.0.1",
          "mockjs": "^1.1.0",
          "nprogress": "^0.2.0",
          "pinia": "^2.3.0",
          "pinia-plugin-persistedstate": "^4.1.3",
          "qrcode": "^1.5.4",
          "qs": "^6.13.1",
          "vue": "^3.5.13",
          "vue-draggable-plus": "^0.6.0",
          "vue-json-pretty": "^2.4.0",
          "vue-router": "^4.4.5",
          "vue-types": "^5.1.3",
          "xgplayer": "^3.0.20",
          "monaco-editor": "^0.52.2"
        },
        devDependencies: {
          "@commitlint/cli": "^19.6.0",
          "@commitlint/config-conventional": "^19.6.0",
          "@rushstack/eslint-patch": "^1.10.4",
          "@tsconfig/node22": "^22.0.0",
          "@types/jsdom": "^21.1.7",
          "@types/lodash-es": "^4.17.12",
          "@types/node": "^22.10.1",
          "@types/nprogress": "^0.2.3",
          "@types/qrcode": "^1.5.5",
          "@types/qs": "^6.9.17",
          "@vitejs/plugin-vue": "^5.2.1",
          "@vitejs/plugin-vue-jsx": "^4.1.1",
          "@vue/eslint-config-prettier": "^10.1.0",
          "@vue/eslint-config-typescript": "^14.1.4",
          "@vue/test-utils": "^2.4.6",
          "@vue/tsconfig": "^0.7.0",
          "commitizen": "^4.3.1",
          "cz-git": "^1.11.0",
          "eslint": "^9.16.0",
          "eslint-plugin-vue": "^9.32.0",
          "jsdom": "^25.0.1",
          "less": "^4.2.1",
          "lint-staged": "^15.2.10",
          "npm-run-all2": "^7.0.1",
          "plop": "^4.0.1",
          "postcss-html": "^1.7.0",
          "postcss-less": "^6.0.0",
          "prettier": "^3.4.2",
          "rollup-plugin-visualizer": "^5.12.0",
          "standard-version": "^9.5.0",
          "stylelint": "^16.11.0",
          "stylelint-config-html": "^1.1.0",
          "stylelint-config-standard": "^36.0.1",
          "stylelint-order": "^6.0.4",
          "typescript": "~5.6.3",
          "unocss": "^0.65.1",
          "unplugin-auto-import": "^0.18.6",
          "unplugin-vue-components": "^0.27.5",
          "vite": "^6.0.3",
          "vite-plugin-ejs": "^1.7.0",
          "vite-plugin-mock": "2.9.6",
          "vite-plugin-style-import": "^2.0.0",
          "vite-plugin-svg-icons": "^2.0.1",
          "vitest": "^2.1.8",
          "vue-tsc": "^2.1.10"
        }
      }
    }
    else {
      api.pkg = {
        dependencies: {
          vue: "^3.5.13"
        },
        devDependencies: {
          "@vitejs/plugin-vue": "^5.2.1",
          "@vue/tsconfig": "^0.7.0",
          typescript: "~5.6.2",
          vite: "^6.0.5",
          "vue-tsc": "^2.2.0"
        }
      };
    }
   
  };

  /**
   * 设置模板函数
   * 该函数负责将指定模板类型的模板文件全部加载并渲染
   *
   * @param api GeneratorClass实例，包含模板类型和项目基础选项
   * @returns Promise<void> 无返回值
   */
  setTemplate = async (api: GeneratorClass): Promise<void> => {
    // 构建模板目录的绝对路径
    const dir = path.resolve(__dirname, `./${api.templateName}`);

    // 获取模板目录下所有文件的路径
    const result = await getDirAllFiles(dir);

    // 遍历所有文件路径
    for (const _path of result) {
      // 构建文件的绝对路径
      const filePath = path.resolve(dir, _path);
      // 将文件路径和渲染后的文件内容添加到模板路径集合中
      api.templateAllPath.set(
        _path,
        renderFile(filePath, {
          projectType: api.baseOptions.templateType,
          projectName: api.baseOptions.projectName
        })
      );
    }
  };
}

export default new GeneratorVue();
