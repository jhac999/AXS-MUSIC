function getCheckedValues(name) {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
        }

        function submitForm() {
            // 0. 基础设定
            const usageRadio = document.querySelector('input[name="usage"]:checked');
            let usageStr = usageRadio ? usageRadio.value : '未提供';
            const usageOther = document.getElementById('usage_other').value;
            if (usageOther) usageStr = usageOther;

            let vocals = getCheckedValues('vocal_type');
            const vocalOther = document.getElementById('vocal_other').value;
            if (vocalOther) vocals.push(vocalOther);
            const vocalStr = vocals.length > 0 ? vocals.join(', ') : '未提供';

            // 1. 想要的风格参考
            const refStyle1 = document.getElementById('ref_style_1').value;
            const refStyle2 = document.getElementById('ref_style_2').value;
            const refStyle3 = document.getElementById('ref_style_3').value;
            const refStyles = [refStyle1, refStyle2, refStyle3].filter(Boolean).join(' / ') || '未提供';

            // 2. 主奏乐器
            let instruments = getCheckedValues('instrument');
            const instOther = document.getElementById('instrument_other').value;
            if (instOther) instruments.push(instOther);
            const instrumentsStr = instruments.length > 0 ? instruments.join(', ') : '未提供';

            // 3. 主歌感觉
            let verseVibe = getCheckedValues('verse_vibe');
            const verseOther = document.getElementById('verse_other').value;
            if (verseOther) verseVibe.push(verseOther);
            const verseStr = verseVibe.length > 0 ? verseVibe.join(', ') : '未提供';

            // 副歌感觉
            let chorusVibe = getCheckedValues('chorus_vibe');
            const chorusOther = document.getElementById('chorus_other').value;
            if (chorusOther) chorusVibe.push(chorusOther);
            const chorusStr = chorusVibe.length > 0 ? chorusVibe.join(', ') : '未提供';

            // 4. 过渡与结束方式
            const transitionRadio = document.querySelector('input[name="transition_vibe"]:checked');
            let transitionStr = transitionRadio ? transitionRadio.value : '未提供';
            const transitionOther = document.getElementById('transition_other').value;
            if (transitionOther) transitionStr = transitionOther;

            const endingRadio = document.querySelector('input[name="ending_vibe"]:checked');
            let endingStr = endingRadio ? endingRadio.value : '未提供';
            const endingOther = document.getElementById('ending_other').value;
            if (endingOther) endingStr = endingOther;

            // 5. 整体音乐风格
            let genres = getCheckedValues('genre');
            const genreOther = document.getElementById('genre_other').value;
            if (genreOther) genres.push(genreOther);
            const genreStr = genres.length > 0 ? genres.join(' + ') : '未提供';

            // 6. 节奏感觉
            const tempoRadio = document.querySelector('input[name="tempo"]:checked');
            const tempoStr = tempoRadio ? tempoRadio.value : '未提供';

            // 6.1 调性与和声
            const keyUnknown = document.getElementById('key_unknown').checked;
            const keyInput = document.getElementById('key_input').value.trim();
            const keyStr = keyUnknown ? '不确定（由制作人决定）' : (keyInput || '未提供');

            const modeRadio = document.querySelector('input[name="mode_type"]:checked');
            const modeStr = modeRadio ? modeRadio.value : '未提供';

            const harmonyRadio = document.querySelector('input[name="harmony_complex"]:checked');
            const harmonyStr = harmonyRadio ? harmonyRadio.value : '未提供';

            const modulationRadio = document.querySelector('input[name="modulation"]:checked');
            const modulationStr = modulationRadio ? modulationRadio.value : '未提供';

            // 7. 核心情绪
            let verseEmotions = getCheckedValues('verse_emotion');
            const verseEmoOther = document.getElementById('verse_emotion_other').value;
            if (verseEmoOther) verseEmotions.push(verseEmoOther);
            const verseEmotionStr = verseEmotions.length > 0 ? verseEmotions.join(', ') : '未提供';

            let chorusEmotions = getCheckedValues('chorus_emotion');
            const chorusEmoOther = document.getElementById('chorus_emotion_other').value;
            if (chorusEmoOther) chorusEmotions.push(chorusEmoOther);
            const chorusEmotionStr = chorusEmotions.length > 0 ? chorusEmotions.join(', ') : '未提供';

            // 8. 提供的歌词
            const lyricsFull = document.getElementById('lyrics_full').value.trim();
            let lyricsStr = '';
            if (lyricsFull) {
                lyricsStr = `\n   ${lyricsFull.replace(/\\n/g, '\\n   ')}\n`;
            } else {
                lyricsStr = '- 未提供';
            }



            const template = `【客户需求参数卡 - 音乐风格定位问卷】

0. 基础设定：
   - [用途与时长]：${usageStr}
   - [人声与语言]：${vocalStr}

1. 目标风格参考：
   - ${refStyles}

2. 主奏乐器及配器要求：
   - ${instrumentsStr}

3. 结构与情绪起伏：
   - [主歌感觉]：${verseStr}
   - [副歌感觉]：${chorusStr}
   - [主副歌过渡]：${transitionStr}
   - [歌曲结束方式]：${endingStr}

4. 整体音乐风格：
   - ${genreStr}

5. 节奏及速度 (BPM)：
   - ${tempoStr}

6.1 调性与和声（Key & Harmony）：
   - [调性]：${keyStr}
   - [调式类型]：${modeStr}
   - [和声复杂度]：${harmonyStr}
   - [转调]：${modulationStr}

6. 核心情绪传达：
   - [主歌情绪]：${verseEmotionStr}
   - [副歌情绪]：${chorusEmotionStr}

7. 歌词文本：
   ${lyricsStr}

---
8. 最终交付规格要求 (多模型矩阵)：
   - 基于以上核心音乐参数，本次制作必须采用多模型组合生成方式。
   - 【数量与模型分配】：共计需产出 10 首 Demo。其中主力模型 Suno 产出 4 首；Udio 产出 3 首；Mureka 产出 3 首。

---
(请一键复制此参数卡，发送给您的专属提示词架构师或其他专家库进行深度执行)`;

            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "正在发送至专属邮箱...";
            submitBtn.style.backgroundColor = "var(--accent)";
            submitBtn.style.color = "var(--canvas-deep)";
            submitBtn.style.pointerEvents = "none"; // 禁用按钮防止重复点击

            // 1. 本地极客代码框展示
            document.getElementById('codeOutput').innerText = template;
            const consoleEl = document.getElementById('console');
            consoleEl.style.display = 'block';
            void consoleEl.offsetWidth; // 触发重绘
            consoleEl.classList.add('visible');
            setTimeout(() => {
                consoleEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);

            // 2. 发送到邮箱 (FormSubmit) - 改为表单新标签页提交以绕过本地文件 CORS 限制
            try {
                const form = document.createElement('form');
                form.action = "https://formsubmit.co/el/hayifo";
                form.method = "POST";
                form.target = "_blank"; // 在新标签页打开，避免覆盖当前页面且能处理可能的验证码

                const subjectInput = document.createElement('input');
                subjectInput.type = "hidden";
                subjectInput.name = "_subject";
                subjectInput.value = "【AXS MUSIC】新客户配置表提交";
                form.appendChild(subjectInput);

                const captchaInput = document.createElement('input');
                captchaInput.type = "hidden";
                captchaInput.name = "_captcha";
                captchaInput.value = "false"; // 尝试禁用验证码
                form.appendChild(captchaInput);

                const messageInput = document.createElement('input');
                messageInput.type = "hidden";
                messageInput.name = "message";
                messageInput.value = template;
                form.appendChild(messageInput);

                // 添加隐藏的 honeypot 防止垃圾邮件
                const honeyInput = document.createElement('input');
                honeyInput.type = "text";
                honeyInput.name = "_honey";
                honeyInput.style.display = "none";
                form.appendChild(honeyInput);

                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);

                submitBtn.innerText = "发送请求已提交（请查看新标签页）";
                submitBtn.style.backgroundColor = "#10b981"; // 绿
                submitBtn.style.color = "#fff";
                submitBtn.style.pointerEvents = "auto";
            } catch (error) {
                console.error("Mail Error:", error);
                submitBtn.innerText = "生成失败，请直接复制下方数据";
                submitBtn.style.backgroundColor = "#ef4444"; // 红
                submitBtn.style.pointerEvents = "auto";
            }
        }

        function copyToClipboard() {
            const text = document.getElementById('codeOutput').innerText;
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.querySelector('.copy-btn');
                const originalText = btn.innerText;
                btn.innerText = 'COPIED!';
                btn.style.color = 'var(--accent)';
                btn.style.borderColor = 'var(--accent)';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.color = 'var(--text-secondary)';
                    btn.style.borderColor = 'var(--hairline-strong)';
                }, 2000);
            });
        }

// BGM 播放器交互逻辑
document.addEventListener('DOMContentLoaded', () => {
    const widget = document.getElementById('audio-controller');
    const bgm = document.getElementById('bgm');
    const text = widget.querySelector('.audio-text');

    if (widget && bgm) {
        widget.addEventListener('click', () => {
            if (bgm.paused) {
                // 浏览器可能会拦截，加入 catch 处理
                bgm.play().then(() => {
                    widget.classList.remove('muted');
                    text.innerText = 'BGM [ON]';
                }).catch(e => {
                    console.error("Audio play failed:", e);
                });
            } else {
                bgm.pause();
                widget.classList.add('muted');
                text.innerText = 'BGM [OFF]';
            }
        });
    }
});
