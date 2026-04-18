const lstData = [
    {
        name: "Marinade (mSOL)",
        apy: 6.2,
        risk: "safe",
        riskText: "安全：成立时间久，资金规模大，社区成熟",
        tvl: "约 3 亿美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0.1%",
        historicalNote: "2021年上线，经历过多次牛市考验，协议成熟稳定",
        website: "https://marinade.finance"
    },
    {
        name: "Jito (jitoSOL)",
        apy: 6.5,
        risk: "safe",
        riskText: "安全：机构支持，技术实力强，市场认可度高",
        tvl: "约 2.5 亿美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "2022年上线，靠 MEV 收益脱颖而出，机构投资者青睐",
        website: "https://jito.network"
    },
    {
        name: "Lido (stSOL)",
        apy: 5.9,
        risk: "safe",
        riskText: "安全：跨链知名协议，审计严格，用户基数大",
        tvl: "约 8 亿美元（含多链）",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "以太坊 Lido 的 Solana 版本，2022年上线，审计严格",
        website: "https://solana.lido.fi"
    },
    {
        name: "Solflare Stake",
        apy: 6.1,
        risk: "safe",
        riskText: "安全：钱包背景，用户量大，界面友好",
        tvl: "约 1 亿美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "Solflare 钱包内置质押功能，2020年上线，用户基数大",
        website: "https://solflare.com/stake"
    },
    {
        name: "Blaze (blazeSOL)",
        apy: 7.3,
        risk: "medium",
        riskText: "中等：收益有竞争力，需要关注其发展",
        tvl: "约 2000 万美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "2023年上线，增长迅速，收益较高但历史较短",
        website: "https://blaze.fi"
    },
    {
        name: "Lunarplex (lunaSOL)",
        apy: 7.1,
        risk: "medium",
        riskText: "中等：新兴协议，收益较高但历史较短",
        tvl: "约 1500 万美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "2023年上线，新兴协议，社区驱动",
        website: "https://lunarplex.fi"
    },
    {
        name: "Solblaze (blzeSOL)",
        apy: 7.0,
        risk: "medium",
        riskText: "中等：社区驱动，高收益著称，需要注意合约风险",
        tvl: "约 1000 万美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "2022年上线，社区驱动，以高收益著称",
        website: "https://solblaze.org"
    },
    {
        name: "Quartz (qSOL)",
        apy: 6.3,
        risk: "safe",
        riskText: "安全：Granite 团队开发，专注于合规和透明",
        tvl: "约 3000 万美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "2023年上线，Granite 团队背景，强调合规和透明",
        website: "https://quartz.so"
    },
    {
        name: "Coldhack (hackSOL)",
        apy: 6.8,
        risk: "medium",
        riskText: "中等：社区项目，创新机制，审计历史较短",
        tvl: "约 500 万美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0.5%",
        historicalNote: "2023年上线，社区驱动项目，机制较新",
        website: "https://coldhack.io"
    },
    {
        name: "Daopool (daoSOL)",
        apy: 6.4,
        risk: "medium",
        riskText: "中等：DAO 治理模式，收益稳定但治理复杂度高",
        tvl: "约 800 万美元",
        lockPeriod: "无锁仓，随时解质押",
        mintFee: "0%",
        redeemFee: "0%",
        historicalNote: "2022年上线，DAO 治理模式，去中心化程度高",
        website: "https://daopool.io"
    }
];

function calculateYearlyEarnings(solAmount, apy) {
    return solAmount * (apy / 100);
}

function renderLstList() {
    const solAmount = parseFloat(document.getElementById('sol-amount').value);
    const lstList = document.getElementById('lst-list');
    
    lstList.innerHTML = '';
    
    const sortedLstData = [...lstData].sort((a, b) => b.apy - a.apy);
    
    sortedLstData.forEach((lst, index) => {
        const yearlyEarnings = calculateYearlyEarnings(solAmount, lst.apy);
        
        const lstCard = document.createElement('div');
        lstCard.className = 'lst-card';
        
        lstCard.innerHTML = `
            <div class="lst-info">
                <h3>${lst.name}</h3>
                <div class="key-metrics">
                    <span class="metric apy">年化: <strong>${lst.apy}%</strong></span>
                    <span class="metric earnings">年收益: <strong>${yearlyEarnings.toFixed(2)} SOL</strong></span>
                    <span class="risk-tag risk-${lst.risk}">${lst.riskText}</span>
                </div>
                <div class="detail-row">
                    <span>资金规模: <strong>${lst.tvl}</strong></span>
                    <span>锁仓期: <strong>${lst.lockPeriod}</strong></span>
                </div>
                <div class="detail-row">
                    <span>铸造费: <strong>${lst.mintFee}</strong></span>
                    <span>赎回费: <strong>${lst.redeemFee}</strong></span>
                </div>
                <div class="historical-note">📜 ${lst.historicalNote}</div>
                <button class="detail-toggle" onclick="toggleDetail(${index})">查看详情</button>
                <div class="extra-detail" id="detail-${index}">
                    <h4>风险分析</h4>
                    <ul>
                        <li>协议上线时间: ${lst.historicalNote.match(/\d{4}/)?.[0] || '未知'} 年</li>
                        <li>当前资金规模: ${lst.tvl}</li>
                        <li>风险评级: ${lst.risk === 'safe' ? '🟢 低风险' : '🟡 中等风险'}</li>
                        <li>费用结构: 铸造费 ${lst.mintFee} + 赎回费 ${lst.redeemFee}</li>
                    </ul>
                    <h4>投资建议</h4>
                    <p>${lst.risk === 'safe' 
                        ? '适合追求稳定收益的投资者，协议成熟可靠，长期安全性高。' 
                        : '适合能够承受一定风险的投资者，高收益伴随新协议的不确定性，建议分散投资。'}</p>
                </div>
            </div>
            <div class="card-actions">
                <a href="${lst.website}" target="_blank" class="btn">去官网</a>
                <button class="btn-compare" onclick="addToCompare('${lst.name}')">加入对比</button>
            </div>
        `;
        
        lstList.appendChild(lstCard);
    });
}

function toggleDetail(index) {
    const detail = document.getElementById(`detail-${index}`);
    const btn = detail.previousElementSibling;
    if (detail.classList.contains('open')) {
        detail.classList.remove('open');
        btn.textContent = '查看详情';
    } else {
        detail.classList.add('open');
        btn.textContent = '收起详情';
    }
}

let compareList = [];

function addToCompare(name) {
    if (compareList.includes(name)) {
        compareList = compareList.filter(n => n !== name);
        alert(`已从对比列表中移除 ${name}`);
    } else {
        if (compareList.length >= 3) {
            alert('最多只能对比 3 个协议，请先移除一个');
            return;
        }
        compareList.push(name);
        alert(`已添加 ${name} 到对比列表，当前对比: ${compareList.join(' vs ')}`);
    }
    renderCompareTable();
}

function renderCompareTable() {
    const container = document.getElementById('compare-section');
    if (compareList.length < 2) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    const compareData = lstData.filter(lst => compareList.includes(lst.name));
    const solAmount = parseFloat(document.getElementById('sol-amount').value) || 10;
    
    let html = '<h3>📊 协议对比</h3>';
    html += '<table class="compare-table"><thead><tr><th>协议</th>';
    compareData.forEach(lst => {
        html += `<th>${lst.name}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    html += '<tr><td>年化收益率</td>';
    compareData.forEach(lst => {
        html += `<td><strong>${lst.apy}%</strong></td>`;
    });
    html += '</tr>';
    
    html += '<tr><td>一年收益 (${solAmount} SOL)</td>';
    compareData.forEach(lst => {
        const earnings = calculateYearlyEarnings(solAmount, lst.apy);
        html += `<td><strong>${earnings.toFixed(2)} SOL</strong></td>`;
    });
    html += '</tr>';
    
    html += '<tr><td>资金规模</td>';
    compareData.forEach(lst => {
        html += `<td>${lst.tvl}</td>`;
    });
    html += '</tr>';
    
    html += '<tr><td>锁仓期</td>';
    compareData.forEach(lst => {
        html += `<td>${lst.lockPeriod}</td>`;
    });
    html += '</tr>';
    
    html += '<tr><td>铸造费</td>';
    compareData.forEach(lst => {
        html += `<td>${lst.mintFee}</td>`;
    });
    html += '</tr>';
    
    html += '<tr><td>赎回费</td>';
    compareData.forEach(lst => {
        html += `<td>${lst.redeemFee}</td>`;
    });
    html += '</tr>';
    
    html += '<tr><td>风险评级</td>';
    compareData.forEach(lst => {
        html += `<td><span class="risk-tag risk-${lst.risk}">${lst.riskText.split('：')[0]}</span></td>`;
    });
    html += '</tr>';
    
    html += '</tbody></table>';
    html += '<button class="btn-clear" onclick="clearCompare()">清空对比</button>';
    
    container.innerHTML = html;
}

function clearCompare() {
    compareList = [];
    renderCompareTable();
}

renderLstList();

document.getElementById('sol-amount').addEventListener('input', () => {
    renderLstList();
    renderCompareTable();
});