function getCheckedValues(name) {
            return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
        }

        async function submitForm() {
            // 0. 基础设定
            const engineRadio = document.querySelector('input[name="engine_mode"]:checked');
            const engineStr = engineRadio ? engineRadio.value : '未提供';

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

            // 3.5 能量曲线
            const energyA = document.getElementById('energy_a') ? document.getElementById('energy_a').value : '未提供';
            const energyB = document.getElementById('energy_b') ? document.getElementById('energy_b').value : '未提供';
            const energyBridgeRadio = document.querySelector('input[name="energy_bridge"]:checked');
            const energyBridgeStr = energyBridgeRadio ? energyBridgeRadio.value : '未提供';

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
            const checkedGenres = Array.from(document.querySelectorAll('input[name="genre"]:checked'));
            let genreStr = '';
            if (checkedGenres.length > 0) {
                const primary = checkedGenres[0].value;
                const secondary = checkedGenres.slice(1).map(el => el.value).join(' + ');
                genreStr = `【主风格】${primary}`;
                if (secondary) genreStr += ` | 【次风格】${secondary}`;
            }
            const genreOther = document.getElementById('genre_other').value;
            if (genreOther) genreStr += ` | 【补充】${genreOther}`;
            if (!genreStr) genreStr = '未提供';

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

            // 6.5 核心情绪强度
            const intLonely = document.getElementById('int_lonely') ? document.getElementById('int_lonely').value : '0';
            const intPower = document.getElementById('int_power') ? document.getElementById('int_power').value : '0';
            const intPassion = document.getElementById('int_passion') ? document.getElementById('int_passion').value : '0';
            const intHealing = document.getElementById('int_healing') ? document.getElementById('int_healing').value : '0';
            const intJoy = document.getElementById('int_joy') ? document.getElementById('int_joy').value : '0';
            const intRomance = document.getElementById('int_romance') ? document.getElementById('int_romance').value : '0';

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
   - [生成引擎模式]：${engineStr}
   - [用途与时长]：${usageStr}
   - [人声与语言]：${vocalStr}

1. 目标风格参考：
   - ${refStyles}

2. 主奏乐器及配器要求：
   - ${instrumentsStr}

3. 结构与情绪起伏：
   - [A段能量 (1-5)]：${energyA}
   - [B段能量 (6-10)]：${energyB}
   - [桥段动态]：${energyBridgeStr}
   - [主歌具体感觉]：${verseStr}
   - [副歌具体感觉]：${chorusStr}
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
   - [核心强度底色]：孤独(${intLonely}/10), 力量(${intPower}/10), 热血(${intPassion}/10), 治愈(${intHealing}/10), 欢快(${intJoy}/10), 浪漫(${intRomance}/10)
   - [主歌具体情绪]：${verseEmotionStr}
   - [副歌具体情绪]：${chorusEmotionStr}

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

            // 2. 发送至飞书多维表格 (通过本地代理服务)
            try {
                const feishuData = {
                    "用途与时长": usageStr,
                    "人声类型与语言要求": vocals,
                    "目标风格参考": refStyles,
                    "主奏乐器及配器要求": instruments,
                    "主歌感觉": verseVibe,
                    "副歌感觉": chorusVibe,
                    "主副歌过渡": transitionStr,
                    "歌曲结束方式": endingStr,
                    "整体音乐风格": genres,
                    "节奏及速度 (BPM)": tempoStr,
                    "调性（Key）": keyStr,
                    "调式类型": modeStr,
                    "和声复杂度": harmonyStr,
                    "是否允许转调": modulationStr,
                    "主歌核心情绪": verseEmotions,
                    "副歌核心情绪": chorusEmotions,
                    "已有歌词提供": lyricsFull || "未提供"
                };

                const response = await fetch("http://127.0.0.1:5000/submit", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(feishuData)
                });

                if (response.ok) {
                    submitBtn.innerText = "发送成功！已同步至飞书多维表格";
                    submitBtn.style.backgroundColor = "#10b981"; // 绿
                    submitBtn.style.color = "#fff";
                    submitBtn.style.pointerEvents = "none";
                } else {
                    throw new Error("服务端返回异常状态码: " + response.status);
                }

            } catch (error) {
                console.error("Feishu Sync Error:", error);
                submitBtn.innerText = "自动同步失败，请直接复制下方参数卡";
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

    // 风格选择逻辑 (1主 2次)
    const genreCheckboxes = document.querySelectorAll('input[name="genre"]');
    let selectedGenres = [];

    genreCheckboxes.forEach(cb => {
        cb.addEventListener('change', function(e) {
            if (this.checked) {
                if (selectedGenres.length >= 3) {
                    this.checked = false;
                    alert('最多只能选择3个风格 (1个主风格 + 最多2个次风格)！');
                    return;
                }
                selectedGenres.push(this);
                updateGenreStyles();
            } else {
                selectedGenres = selectedGenres.filter(item => item !== this);
                updateGenreStyles();
            }
        });
    });

    function updateGenreStyles() {
        genreCheckboxes.forEach(cb => {
            const label = cb.closest('.option-label');
            label.classList.remove('primary-style', 'secondary-style');
            if (cb.checked) {
                const index = selectedGenres.indexOf(cb);
                if (index === 0) {
                    label.classList.add('primary-style');
                } else if (index > 0) {
                    label.classList.add('secondary-style');
                }
            }
        });
    }
});
