document.addEventListener('DOMContentLoaded', () => {
    // 节点获取
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('audio-upload');
    const playerModule = document.getElementById('player-module');
    const audioPlayer = document.getElementById('audio-player');
    
    const checkboxes = document.querySelectorAll('.qc-check');
    const alertBox = document.getElementById('alert-box');
    const generateBtn = document.getElementById('generate-btn');
    const reportBox = document.getElementById('report-box');
    const reportContent = document.getElementById('report-content');
    
    const statusDot = document.getElementById('system-status-dot');
    const statusText = document.getElementById('system-status-text');

    const bpmInput = document.getElementById('bpm-input');
    const keyInput = document.getElementById('key-input');
    const structureInput = document.getElementById('structure-input');

    // 1. 上传音频逻辑
    uploadBox.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if(e.target.files.length > 0) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            audioPlayer.src = url;
            uploadBox.classList.add('hidden');
            playerModule.classList.remove('hidden');
            
            // 更新系统状态
            statusDot.className = 'dot success blinking';
            statusText.textContent = '分析就绪 (AUDIO LOADED)';
            statusText.style.color = 'var(--success-green)';
        }
    });

    // 2. 雷区拦截逻辑
    function checkQCStatus() {
        let hasError = false;
        checkboxes.forEach(cb => {
            if(cb.checked) hasError = true;
        });

        if(hasError) {
            // 触发拦截
            alertBox.classList.remove('hidden');
            generateBtn.classList.add('disabled');
            generateBtn.disabled = true;
            reportBox.classList.add('hidden');
            
            // 爆红灯
            statusDot.className = 'dot danger blinking';
            statusText.textContent = '质检拦截 (QC FAILED)';
            statusText.style.color = 'var(--danger-red)';
            document.body.style.boxShadow = 'inset 0 0 100px rgba(239, 68, 68, 0.1)';
        } else {
            // 解除拦截
            alertBox.classList.add('hidden');
            generateBtn.classList.remove('disabled');
            generateBtn.disabled = false;
            document.body.style.boxShadow = 'none';
            
            // 恢复就绪
            if(!uploadBox.classList.contains('hidden')) {
                statusDot.className = 'dot blinking';
                statusText.textContent = '系统待命 (AWAITING AUDIO INPUT)';
                statusText.style.color = '';
            } else {
                statusDot.className = 'dot success blinking';
                statusText.textContent = '分析就绪 (AUDIO LOADED)';
                statusText.style.color = 'var(--success-green)';
            }
        }
    }

    checkboxes.forEach(cb => {
        cb.addEventListener('change', checkQCStatus);
    });

    // 3. 报告生成逻辑
    generateBtn.addEventListener('click', () => {
        if(generateBtn.disabled) return;
        
        const bpm = bpmInput.value || '未知';
        const key = keyInput.value || '未知';
        const flow = structureInput.value || '未测算';

        generateBtn.innerHTML = '<span class="btn-text">测算中 [CALCULATING...]</span>';
        
        // 模拟生成延迟
        setTimeout(() => {
            const reportText = `[系统回执] AXS 逆向测算结案报告
=======================================
[1] 宏观物理参数
---------------------------------------
> 实测 BPM      :: ${bpm}
> 实测调性      :: ${key}
> 配器段落流    :: ${flow}

[2] 空间与母带质检 (QC PASS)
---------------------------------------
> 低频动态分析  :: 饱满且无泥泞感 (Mud-free)
> 高频谐波检测  :: 丝滑，无明显高斯模糊伪影
> 整体混响比    :: 契合工业标准

[3] 专家库结论
---------------------------------------
[PASS] 本音频成功通过 Step 7 逆向解析质检引擎拦截网。
允许封包，进入交付状态。
`;
            reportContent.textContent = reportText;
            reportBox.classList.remove('hidden');
            
            generateBtn.innerHTML = '<span class="btn-text">重新测算 (RE-CALCULATE)</span>';
            
            // 状态改为成功
            statusDot.classList.remove('blinking');
        }, 1500);
    });
});
