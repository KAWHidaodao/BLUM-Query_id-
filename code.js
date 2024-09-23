// ==UserScript==
// @name         Telegram Query ID Scraper with Copy Box
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  抓取telegram.blum.codes网站上的sessionStorage中的query_id并通过页面文本框手动复制
// @author       You
// @match        https://telegram.blum.codes/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 确保页面加载完成后执行脚本
    window.addEventListener('load', function() {
        // 尝试获取 sessionStorage 中的 query_id
        const queryId = sessionStorage.getItem('query_id');

        if (queryId) {
            console.log(`Query ID: ${queryId}`);

            // 尝试自动将 query_id 复制到剪贴板
            navigator.clipboard.writeText(queryId).then(function() {
                console.log('Query ID 已自动复制到剪贴板');
                alert(`Query ID: ${queryId} 已自动复制到剪贴板!`);
            }).catch(function(err) {
                console.error('自动复制到剪贴板失败: ', err);

                // 创建一个文本框供用户复制
                alert('自动复制失败，手动复制 Query ID。');

                // 创建一个输入框来显示 query_id
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = queryId;
                inputField.readOnly = true; // 防止用户修改
                inputField.style.position = 'fixed';
                inputField.style.top = '10px';
                inputField.style.left = '10px';
                inputField.style.zIndex = '9999';
                inputField.style.padding = '10px';
                inputField.style.border = '2px solid #4CAF50';
                inputField.style.borderRadius = '5px';
                inputField.style.width = '300px';

                // 创建提示文本
                const instruction = document.createElement('div');
                instruction.textContent = '手动复制 Query ID:';
                instruction.style.position = 'fixed';
                instruction.style.top = '40px';
                instruction.style.left = '10px';
                instruction.style.zIndex = '9999';
                instruction.style.backgroundColor = '#fff';
                instruction.style.padding = '10px';

                // 将输入框和提示文本添加到页面中
                document.body.appendChild(instruction);
                document.body.appendChild(inputField);

                // 自动选择文本框中的内容
                inputField.select();
            });
        } else {
            console.log('No Query ID found in sessionStorage.');
            alert('No Query ID found in sessionStorage.');
        }
    });
})();
