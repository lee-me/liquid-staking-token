// 全局变量
let currentLanguage = 'zh';
let currentTheme = 'light';
let currentTab = 'all';
let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
let isLoading = false;
let lastUpdateTime = null;
let wallet = null;
let walletAddress = null;
let solBalance = 0;
let userLstHoldings = [];
let selectedProtocol = null; // 当前选中的协议

// 语言翻译
const translations = {
    zh: {
        allProtocols: '全部协议',
        myFavorites: '我的收藏',
        protocolComparison: '协议对比',
        searchPlaceholder: '输入协议名称...',
        sortBy: '排序方式',
        apyDesc: '年化收益从高到低',
        apyAsc: '年化收益从低到高',
        tvlDesc: '资金规模从大到小',
        tvlAsc: '资金规模从小到大',
        riskAsc: '最安全优先',
        ratingDesc: '用户评分从高到低',
        riskLevel: '风险等级',
        safe: '安全',
        medium: '中等',
        caution: '需谨慎',
        depositFee: '存款费用',
        unstakeFee: '解押费用',
        unstakeTime: '解押时间',
        launchTime: '发行时间',
        auditStatus: '审计状态',
        tvl: '总锁仓',
        apy: '年化收益',
        risk: '风险',
        rating: '用户评分',
        stake: '质押',
        addToFavorites: '添加收藏',
        removeFromFavorites: '移除收藏',
        addToCompare: '添加对比',
        removeFromCompare: '移除对比',
        dailyEarnings: '每日收益',
        weeklyEarnings: '7天收益',
        monthlyEarnings: '30天收益',
        yearlyEarnings: '1年收益',
        compoundEarnings: '复利收益',
        safetyRating: '安全评级',
        auditInfo: '审计信息',
        teamInfo: '团队信息',
        communitySize: '社区规模',
        protocolRisk: '协议风险',
        unstakeProcess: '解押流程',
        liquidityInfo: '流动性信息',
        whatIsLST: '什么是 LST？',
        lstExplanation: 'LST = Liquid Staking Token（流动性质押代币）。简单来说，就是你把 SOL 质押给验证者，获得一个可以在市场上自由交易的代币（比如 mSOL、jitoSOL），同时还能赚取质押收益。',
        whatIsAPY: '什么是 APY？',
        apyExplanation: 'APY = Annual Percentage Yield（年化收益率）。就是你把钱存一年能赚多少利息。比如 6% APY 意味着存 100 SOL 一年后能拿 6 SOL 利息。',
        isStakingSafe: '质押安全吗？',
        stakingSafetyExplanation: '质押本身是安全的，但不同协议有不同风险。我们用颜色标记：绿色=安全，黄色=中等，红色=需谨慎。建议新手选择安全等级高的协议。',
        newbieRecommendation: '新手推荐',
        home: '首页',
        protocols: '协议',
        compare: '对比',
        faq: 'FAQ',
        about: '关于',
        sectionSubtitle: '比较不同协议的收益、风险和安全性',
        compareSubtitle: '比较多个 LST 协议的详细指标',
        faqSubtitle: '关于 LST 和质押的常见问题',
        aboutSubtitle: '我们的使命和愿景',
        sevenDayEarnings: '7日收益',
        thirtyDayEarnings: '30日收益',
        oneYearCompound: '1年复利收益',
        realYield: '真实收益率 (扣除通胀)',
        smartRecommendation: '智能推荐',
        conservative: '保守型',
        balanced: '平衡型',
        aggressive: '激进型',
        conservativeDesc: '优先安全，稳健收益',
        balancedDesc: '安全与收益平衡',
        aggressiveDesc: '追求高收益',
        yourPortfolio: '您的推荐组合（基于 100 SOL）',
        estimatedYearlyEarnings: '预计年收益',
        recommendedProtocols: '推荐协议详情'
    },
    en: {
        allProtocols: 'All Protocols',
        myFavorites: 'My Favorites',
        protocolComparison: 'Protocol Comparison',
        searchPlaceholder: 'Search protocols...',
        sortBy: 'Sort by',
        apyDesc: 'APY (High to Low)',
        apyAsc: 'APY (Low to High)',
        tvlDesc: 'TVL (High to Low)',
        tvlAsc: 'TVL (Low to High)',
        riskAsc: 'Safety First',
        ratingDesc: 'Rating (High to Low)',
        riskLevel: 'Risk Level',
        safe: 'Safe',
        medium: 'Medium',
        caution: 'Caution',
        depositFee: 'Deposit Fee',
        unstakeFee: 'Unstake Fee',
        unstakeTime: 'Unstake Time',
        launchTime: 'Launch Time',
        auditStatus: 'Audit Status',
        tvl: 'TVL',
        apy: 'APY',
        risk: 'Risk',
        rating: 'Rating',
        stake: 'Stake',
        addToFavorites: 'Add to Favorites',
        removeFromFavorites: 'Remove from Favorites',
        addToCompare: 'Add to Compare',
        removeFromCompare: 'Remove from Compare',
        dailyEarnings: 'Daily Earnings',
        weeklyEarnings: '7-day Earnings',
        monthlyEarnings: '30-day Earnings',
        yearlyEarnings: '1-year Earnings',
        compoundEarnings: 'Compound Earnings',
        safetyRating: 'Safety Rating',
        auditInfo: 'Audit Info',
        teamInfo: 'Team Info',
        communitySize: 'Community Size',
        protocolRisk: 'Protocol Risk',
        unstakeProcess: 'Unstake Process',
        liquidityInfo: 'Liquidity Info',
        whatIsLST: 'What is LST?',
        lstExplanation: 'LST = Liquid Staking Token. Simply put, you stake your SOL with validators and receive a token (like mSOL, jitoSOL) that can be freely traded while earning staking rewards.',
        whatIsAPY: 'What is APY?',
        apyExplanation: 'APY = Annual Percentage Yield. It\'s how much interest you can earn in a year. For example, 6% APY means staking 100 SOL will earn you about 6 SOL in a year.',
        isStakingSafe: 'Is staking safe?',
        stakingSafetyExplanation: 'Staking itself is safe, but different protocols have different risks. We use color coding: green = safe, yellow = medium, red = caution. Newbies are recommended to choose high safety protocols.',
        newbieRecommendation: 'Newbie Recommendation',
        home: 'Home',
        protocols: 'Protocols',
        compare: 'Compare',
        faq: 'FAQ',
        about: 'About',
        sectionSubtitle: 'Compare returns, risks, and security of different protocols',
        compareSubtitle: 'Compare detailed metrics of multiple LST protocols',
        faqSubtitle: 'Common questions about LST and staking',
        aboutSubtitle: 'Our mission and vision',
        sevenDayEarnings: '7-day Earnings',
        thirtyDayEarnings: '30-day Earnings',
        oneYearCompound: '1-year Compound Earnings',
        realYield: 'Real Yield (After Inflation)',
        smartRecommendation: 'Smart Recommendation',
        conservative: 'Conservative',
        balanced: 'Balanced',
        aggressive: 'Aggressive',
        conservativeDesc: 'Safety first, steady returns',
        balancedDesc: 'Balance between safety and returns',
        aggressiveDesc: 'Pursue high returns',
        yourPortfolio: 'Your recommended portfolio (based on 100 SOL)',
        estimatedYearlyEarnings: 'Est. yearly earnings',
        recommendedProtocols: 'Recommended protocols'
    }
};

// 模拟 LST 数据
const lstData = [
    {
        name: 'Jito',
        ticker: 'jitoSOL',
        apy: 6.5,
        baseApy: 5.8,
        rewardApy: 0.7,
        risk: 'safe',
        tvl: 1200000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2023-06',
        auditStatus: 'Audited',
        rating: 4.8,
        description: 'Jito 是 Solana 上的流动性质押协议，专注于 MEV 优化。',
        icon: '🎯',
        officialUrl: 'https://jito.network',
        twitterUrl: 'https://twitter.com/jito_network'
    },
    {
        name: 'Marinade',
        ticker: 'mSOL',
        apy: 6.2,
        baseApy: 5.8,
        rewardApy: 0.4,
        risk: 'safe',
        tvl: 800000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2021-08',
        auditStatus: 'Audited',
        rating: 4.7,
        description: 'Marinade 是 Solana 上最早的流动性质押协议之一。',
        icon: '🌊',
        officialUrl: 'https://marinade.finance',
        twitterUrl: 'https://twitter.com/marinadefinance'
    },
    {
        name: 'Lido',
        ticker: 'stSOL',
        apy: 5.9,
        baseApy: 5.8,
        rewardApy: 0.1,
        risk: 'safe',
        tvl: 500000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2022-01',
        auditStatus: 'Audited',
        rating: 4.9,
        description: 'Lido 是跨链的流动性质押协议，在多个链上都有部署。',
        icon: '🛡️',
        officialUrl: 'https://lido.fi',
        twitterUrl: 'https://twitter.com/lidofinance'
    },
    {
        name: 'Infinity',
        ticker: 'INF',
        apy: 8.8,
        baseApy: 5.8,
        rewardApy: 3.0,
        risk: 'medium',
        tvl: 100000000,
        depositFee: 0.5,
        unstakeFee: 0.5,
        unstakeTime: '1-2 days',
        launchTime: '2023-12',
        auditStatus: 'Audited',
        rating: 4.5,
        description: 'Infinity 是一个新兴的 LST 协议，提供较高的收益。',
        icon: '∞',
        officialUrl: 'https://infinityprotocol.io',
        twitterUrl: 'https://twitter.com/infinityprotocol'
    },
    {
        name: 'Socean',
        ticker: 'scnSOL',
        apy: 6.0,
        baseApy: 5.8,
        rewardApy: 0.2,
        risk: 'safe',
        tvl: 300000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2022-06',
        auditStatus: 'Audited',
        rating: 4.6,
        description: 'Socean 是 Solana 上的流动性质押协议，专注于安全和效率。',
        icon: '🌊',
        officialUrl: 'https://socean.fi',
        twitterUrl: 'https://twitter.com/soceanfi'
    },
    {
        name: 'Solana Foundation',
        ticker: 'SOL',
        apy: 5.8,
        baseApy: 5.8,
        rewardApy: 0,
        risk: 'safe',
        tvl: 2000000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2020-03',
        auditStatus: 'Audited',
        rating: 4.9,
        description: 'Solana 基金会官方质押。',
        icon: '⚡',
        officialUrl: 'https://solana.com',
        twitterUrl: 'https://twitter.com/solana'
    },
    {
        name: 'Everstake',
        ticker: 'evSOL',
        apy: 6.1,
        risk: 'medium',
        tvl: 150000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2022-08',
        auditStatus: 'Audited',
        rating: 4.4,
        description: 'Everstake 是一个全球领先的质押服务提供商。',
        icon: '🔒',
        officialUrl: 'https://everstake.one',
        twitterUrl: 'https://twitter.com/everstake_pool'
    },
    {
        name: 'Nakamoto',
        ticker: 'nSOL',
        apy: 7.2,
        risk: 'medium',
        tvl: 80000000,
        depositFee: 0.25,
        unstakeFee: 0.25,
        unstakeTime: '1-2 days',
        launchTime: '2023-09',
        auditStatus: 'Partially Audited',
        rating: 4.3,
        description: 'Nakamoto 是一个新兴的 LST 协议，提供有竞争力的收益。',
        icon: '⛩️',
        officialUrl: 'https://nakamoto.com',
        twitterUrl: 'https://twitter.com/nakamoto'
    },
    {
        name: 'StakeDAO',
        ticker: 'sdSOL',
        apy: 6.3,
        risk: 'medium',
        tvl: 120000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2022-11',
        auditStatus: 'Audited',
        rating: 4.5,
        description: 'StakeDAO 是一个去中心化的质押协议。',
        icon: '🏦',
        officialUrl: 'https://stakedao.org',
        twitterUrl: 'https://twitter.com/stakedao'
    },
    {
        name: 'Pyth',
        ticker: 'pSOL',
        apy: 5.7,
        risk: 'safe',
        tvl: 200000000,
        depositFee: 0,
        unstakeFee: 0,
        unstakeTime: '2-3 days',
        launchTime: '2022-03',
        auditStatus: 'Audited',
        rating: 4.6,
        description: 'Pyth 是一个专注于预言机服务的协议，也提供流动性质押。',
        icon: '📊',
        officialUrl: 'https://pyth.network',
        twitterUrl: 'https://twitter.com/pythnetwork'
    }
];

// API 配置
const API_CONFIG = {
    refreshInterval: 300000, // 5分钟自动刷新
    timeout: 10000, // 10秒超时
    endpoints: {
        jito: 'https://api.jito.network/v1/staking/apy',
        marinade: 'https://api.marinade.finance/v1/apy',
        lido: 'https://api.lido.fi/v1/solana/apy'
    }
};

// 获取真实 APY 数据
async function fetchRealTimeData() {
    if (isLoading) return;

    isLoading = true;
    updateLoadingStatus(true);

    // 显示骨架屏
    renderSkeleton();

    try {
        // 为每个协议获取真实 APY 数据
        const updatePromises = lstData.map(async (protocol) => {
            try {
                // 根据协议名称选择对应的 API 端点
                let apiUrl = null;
                switch (protocol.name.toLowerCase()) {
                    case 'jito':
                        apiUrl = API_CONFIG.endpoints.jito;
                        break;
                    case 'marinade':
                        apiUrl = API_CONFIG.endpoints.marinade;
                        break;
                    case 'lido':
                        apiUrl = API_CONFIG.endpoints.lido;
                        break;
                    default:
                        // 对于没有 API 端点的协议，使用随机波动
                        const apyChange = (Math.random() - 0.5) * 0.4;
                        protocol.apy = Math.max(1, Math.min(15, parseFloat(protocol.apy) + apyChange)).toFixed(2);
                        return;
                }

                if (apiUrl) {
                    // 设置超时
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

                    try {
                        const response = await fetch(apiUrl, {
                            signal: controller.signal,
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });

                        clearTimeout(timeoutId);

                        if (response.ok) {
                            const data = await response.json();
                            // 根据不同 API 的响应格式提取 APY
                            let newApy = null;

                            if (protocol.name.toLowerCase() === 'jito') {
                                newApy = data.apy ? data.apy * 100 : null; // 转换为百分比
                            } else if (protocol.name.toLowerCase() === 'marinade') {
                                newApy = data.apy ? data.apy : null;
                            } else if (protocol.name.toLowerCase() === 'lido') {
                                newApy = data.current ? data.current : null;
                            }

                            if (newApy) {
                                protocol.apy = newApy.toFixed(2);
                            }
                        }
                    } catch (error) {
                        if (error.name === 'AbortError') {
                            console.warn(`API request for ${protocol.name} timed out`);
                        } else if (error.message.includes('ERR_CONNECTION_CLOSED') || error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
                            console.warn(`API connection issue for ${protocol.name}, using fallback data`);
                            // 连接问题时使用随机波动作为回退
                            const apyChange = (Math.random() - 0.5) * 0.4;
                            protocol.apy = Math.max(1, Math.min(15, parseFloat(protocol.apy) + apyChange)).toFixed(2);
                        } else {
                            console.warn(`Error fetching data for ${protocol.name}:`, error);
                        }
                        // 出错时保持原有数据
                    }
                }

                // 模拟 TVL 变化
                const tvlChange = protocol.tvl * (Math.random() - 0.5) * 0.02;
                protocol.tvl = Math.max(1000000, protocol.tvl + tvlChange);
            } catch (error) {
                console.warn(`Error updating ${protocol.name}:`, error);
                // 出错时保持原有数据
            }
        });

        // 等待所有更新完成
        await Promise.all(updatePromises);

        lastUpdateTime = new Date();
        updateLastUpdateTime();

        // 重新渲染页面
        if (currentTab === 'all' || currentTab === 'favorites') {
            renderLstList();
        } else if (currentTab === 'compare') {
            renderComparisonTable();
        }

        // 检查是否需要显示预警
        checkAlerts();

    } catch (error) {
        console.error('Error fetching real-time data:', error);
        // 错误处理：使用缓存数据
        showAlerts([{
            type: 'info',
            message: '无法获取实时数据，使用缓存数据'
        }]);
    } finally {
        isLoading = false;
        updateLoadingStatus(false);
    }
}

// 更新加载状态
function updateLoadingStatus(loading) {
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
        loadingElement.style.display = loading ? 'block' : 'none';
    }
}

// 更新最后更新时间
function updateLastUpdateTime() {
    const timeElement = document.getElementById('last-update-time');
    if (timeElement && lastUpdateTime) {
        const formattedTime = lastUpdateTime.toLocaleString();
        timeElement.textContent = `最后更新: ${formattedTime}`;
    }
}

// 页面路由和导航
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
}

function navigateToPage(page) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(pageEl => {
        pageEl.classList.remove('active');
    });

    // 显示目标页面
    document.getElementById(`page-${page}`).classList.add('active');

    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-link[data-page="${page}"]`).classList.add('active');

    // 更新移动端导航状态
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const mobileNavItem = document.querySelector(`.mobile-nav-item[data-page="${page}"]`);
    if (mobileNavItem) {
        mobileNavItem.classList.add('active');
    }

    // 特殊处理：如果是协议页面，重新渲染协议列表
    if (page === 'protocols') {
        renderLstList();
    } else if (page === 'defi') {
        renderDeFiPage();
    } else if (page === 'dashboard') {
        renderDashboard();
    } else if (page === 'compare') {
        renderComparisonTable();
    }
}

// 翻译函数
function t(key) {
    return translations[currentLanguage][key] || key;
}

// 切换语言
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateUI();
    updateStaticContent();
}

// 切换主题
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateUI();
}

// 加载保存的主题
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.body.setAttribute('data-theme', currentTheme);
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
}

// 更新 UI
function updateUI() {
    // 更新标签页
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length >= 3) {
        tabs[0].textContent = t('allProtocols');
        tabs[1].textContent = t('myFavorites');
        tabs[2].textContent = t('protocolComparison');
    }

    // 更新搜索框
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.placeholder = t('searchPlaceholder');
    }

    // 更新排序选择
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        const options = sortSelect.options;
        if (options.length >= 6) {
            options[0].text = t('apyDesc');
            options[1].text = t('apyAsc');
            options[2].text = t('tvlDesc');
            options[3].text = t('tvlAsc');
            options[4].text = t('riskAsc');
            options[5].text = t('ratingDesc');
        }
    }

    // 更新风险过滤器
    const riskFilterLabels = document.querySelectorAll('.filter-options label');
    if (riskFilterLabels.length >= 3) {
        riskFilterLabels[0].innerHTML = `<input type="checkbox" class="risk-filter" value="safe" checked> ${t('safe')}`;
        riskFilterLabels[1].innerHTML = `<input type="checkbox" class="risk-filter" value="medium" checked> ${t('medium')}`;
        riskFilterLabels[2].innerHTML = `<input type="checkbox" class="risk-filter" value="caution" checked> ${t('caution')}`;
    }

    // 重新渲染协议列表
    if (currentTab === 'all' || currentTab === 'favorites') {
        renderLstList();
    } else if (currentTab === 'compare') {
        renderComparisonTable();
    }

    // 添加事件监听器
    document.getElementById('sort-by').addEventListener('change', renderLstList);
    document.getElementById('search').addEventListener('input', renderLstList);
    document.querySelectorAll('.risk-filter').forEach(checkbox => {
        checkbox.addEventListener('change', renderLstList);
    });
}

// 更新静态内容
function updateStaticContent() {
    // 更新导航链接
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 7) {
        navLinks[0].textContent = t('home');
        navLinks[1].textContent = t('protocols');
        navLinks[2].textContent = t('compare');
        navLinks[3].textContent = t('defi');
        navLinks[4].textContent = t('dashboard');
        navLinks[5].textContent = t('faq');
        navLinks[6].textContent = t('about');
    }

    // 更新智能推荐部分
    const recommendationSection = document.querySelector('.recommendation-section');
    if (recommendationSection) {
        // 更新标题
        const recTitle = recommendationSection.querySelector('h3');
        if (recTitle) {
            recTitle.innerHTML = `🎯 ${t('smartRecommendation')}`;
        }
        
        // 更新风险偏好按钮
        const profileBtns = recommendationSection.querySelectorAll('.profile-btn');
        if (profileBtns.length >= 3) {
            profileBtns[0].querySelector('.profile-name').textContent = t('conservative');
            profileBtns[0].querySelector('.profile-desc').textContent = t('conservativeDesc');
            profileBtns[1].querySelector('.profile-name').textContent = t('balanced');
            profileBtns[1].querySelector('.profile-desc').textContent = t('balancedDesc');
            profileBtns[2].querySelector('.profile-name').textContent = t('aggressive');
            profileBtns[2].querySelector('.profile-desc').textContent = t('aggressiveDesc');
        }
        
        // 更新推荐组合标题
        const portfolioTitle = recommendationSection.querySelector('.recommendation-summary h4');
        if (portfolioTitle) {
            portfolioTitle.textContent = t('yourPortfolio');
        }
        
        // 更新预计年收益标签
        const earningsLabel = recommendationSection.querySelector('.total-earnings');
        if (earningsLabel) {
            earningsLabel.innerHTML = `${t('estimatedYearlyEarnings')}: <strong id="total-yearly-earnings">0 SOL</strong>`;
        }
        
        // 更新推荐协议详情标题
        const protocolsTitle = recommendationSection.querySelector('.recommendation-details h4');
        if (protocolsTitle) {
            protocolsTitle.textContent = t('recommendedProtocols');
        }
    }

    // 更新大白话解释部分
    const explanationCards = document.querySelectorAll('.explanation-card');
    if (explanationCards.length >= 3) {
        explanationCards[0].querySelector('h3').innerHTML = `🤔 ${t('whatIsLST')}`;
        explanationCards[0].querySelector('p').textContent = t('lstExplanation');

        explanationCards[1].querySelector('h3').innerHTML = `📊 ${t('whatIsAPY')}`;
        explanationCards[1].querySelector('p').textContent = t('apyExplanation');

        explanationCards[2].querySelector('h3').innerHTML = `🔒 ${t('isStakingSafe')}`;
        explanationCards[2].querySelector('p').textContent = t('stakingSafetyExplanation');
    }

    // 更新页面标题
    const pageTitles = document.querySelectorAll('.section-subtitle');
    if (pageTitles.length >= 4) {
        pageTitles[0].textContent = t('sectionSubtitle');
        pageTitles[1].textContent = t('compareSubtitle');
        pageTitles[2].textContent = t('faqSubtitle');
        pageTitles[3].textContent = t('aboutSubtitle');
    }
}

// 切换标签页
function switchTab(tabName) {
    currentTab = tabName;

    // 更新标签页状态
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');

    // 显示/隐藏相应内容
    if (tabName === 'all' || tabName === 'favorites') {
        document.getElementById('input-section').style.display = 'block';
        document.getElementById('lst-list').style.display = 'block';
        document.getElementById('compare-section').style.display = 'none';
        renderLstList();
    } else if (tabName === 'compare') {
        document.getElementById('input-section').style.display = 'none';
        document.getElementById('lst-list').style.display = 'none';
        document.getElementById('compare-section').style.display = 'block';
        renderComparisonTable();
    }
}

// 过滤和排序数据
function filterAndSortData() {
    let filteredData = lstData;

    // 搜索过滤
    const searchTerm = document.getElementById('search').value.toLowerCase();
    if (searchTerm) {
        filteredData = filteredData.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.ticker.toLowerCase().includes(searchTerm)
        );
    }

    // 风险等级过滤
    const selectedRisks = Array.from(document.querySelectorAll('.risk-filter:checked')).map(cb => cb.value);
    filteredData = filteredData.filter(item => selectedRisks.includes(item.risk));

    // 收藏过滤
    if (currentTab === 'favorites') {
        filteredData = filteredData.filter(item => favoriteList.includes(item.ticker));
    }

    // 排序
    const sortBy = document.getElementById('sort-by').value;
    switch (sortBy) {
        case 'apy-desc':
            filteredData.sort((a, b) => b.apy - a.apy);
            break;
        case 'apy-asc':
            filteredData.sort((a, b) => a.apy - b.apy);
            break;
        case 'tvl-desc':
            filteredData.sort((a, b) => b.tvl - a.tvl);
            break;
        case 'tvl-asc':
            filteredData.sort((a, b) => a.tvl - b.tvl);
            break;
        case 'risk-asc':
            const riskOrder = { safe: 0, medium: 1, caution: 2 };
            filteredData.sort((a, b) => riskOrder[a.risk] - riskOrder[b.risk]);
            break;
        case 'rating-desc':
            filteredData.sort((a, b) => b.rating - a.rating);
            break;
    }

    return filteredData;
}

// 格式化数字
function formatNumber(num) {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

// 获取风险颜色
function getRiskColor(risk) {
    switch (risk) {
        case 'safe': return 'var(--success-color)';
        case 'medium': return 'var(--warning-color)';
        case 'caution': return 'var(--danger-color)';
        default: return 'var(--text-secondary)';
    }
}

// 获取风险文本
function getRiskText(risk) {
    switch (risk) {
        case 'safe': return t('safe');
        case 'medium': return t('medium');
        case 'caution': return t('caution');
        default: return risk;
    }
}

// 计算收益
function calculateEarnings(solAmount, apy) {
    const daily = (solAmount * apy / 100) / 365;
    const weekly = daily * 7;
    const monthly = daily * 30;
    const yearly = solAmount * apy / 100;
    const compound = solAmount * Math.pow(1 + apy / 100 / 365, 365) - solAmount;

    return { daily, weekly, monthly, yearly, compound };
}

// 渲染骨架屏
function renderSkeleton() {
    const container = document.getElementById('lst-list');
    if (!container) return;

    container.innerHTML = `
        <div class="skeleton-card">
            <div class="skeleton-header">
                <div class="skeleton-icon loading-skeleton"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title loading-skeleton"></div>
                    <div class="skeleton-desc loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-stats">
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-earnings">
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-actions">
                <div class="skeleton-btn loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
            </div>
        </div>
        <div class="skeleton-card">
            <div class="skeleton-header">
                <div class="skeleton-icon loading-skeleton"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title loading-skeleton"></div>
                    <div class="skeleton-desc loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-stats">
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-earnings">
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-actions">
                <div class="skeleton-btn loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
            </div>
        </div>
        <div class="skeleton-card">
            <div class="skeleton-header">
                <div class="skeleton-icon loading-skeleton"></div>
                <div class="skeleton-text">
                    <div class="skeleton-title loading-skeleton"></div>
                    <div class="skeleton-desc loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-stats">
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
                <div class="skeleton-stat">
                    <div class="skeleton-stat-value loading-skeleton"></div>
                    <div class="skeleton-stat-label loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-earnings">
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
                <div class="skeleton-earning-item">
                    <div class="skeleton-earning-value loading-skeleton"></div>
                    <div class="skeleton-earning-label loading-skeleton"></div>
                </div>
            </div>
            <div class="skeleton-actions">
                <div class="skeleton-btn loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
                <div class="skeleton-btn-secondary loading-skeleton"></div>
            </div>
        </div>
    `;
}

// 渲染协议列表
function renderLstList() {
    const filteredData = filterAndSortData();
    const container = document.getElementById('lst-list');
    if (!container) return;

    const solAmountInput = document.getElementById('sol-amount');
    const solAmount = solAmountInput ? parseFloat(solAmountInput.value) || 10 : 10;

    container.innerHTML = '';

    filteredData.forEach((item, index) => {
        const earnings = calculateEarnings(solAmount, item.apy);
        const isFavorite = favoriteList.includes(item.ticker);
        const isInCompare = compareList.includes(item.ticker);

        const lstCard = document.createElement('div');
        lstCard.className = 'lst-card';
        lstCard.innerHTML = `
            <div class="lst-header">
                <div class="lst-icon">${item.icon}</div>
                <div class="lst-info">
                    <h3>${item.name} (${item.ticker})</h3>
                    <p>${item.description}</p>
                </div>
                <div class="lst-risk" style="color: ${getRiskColor(item.risk)}">
                    ${getRiskText(item.risk)}
                </div>
            </div>
            <div class="lst-stats">
                <div class="stat">
                    <span class="stat-label">${t('apy')}</span>
                    <span class="stat-value apy">${item.apy}%</span>
                </div>
                <div class="stat">
                    <span class="stat-label">${t('tvl')}</span>
                    <span class="stat-value">$${formatNumber(item.tvl)}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">${t('rating')}</span>
                    <span class="stat-value">${item.rating}/5</span>
                </div>
            </div>
            <!-- APY收益结构拆解 -->
            <div class="apy-breakdown">
                <div class="breakdown-header">
                    <span>📊 APY 结构拆解</span>
                </div>
                <div class="breakdown-bars">
                    <div class="breakdown-bar">
                        <div class="bar-label">基础质押收益</div>
                        <div class="bar-container">
                            <div class="bar-fill bar-base" style="width: ${(item.baseApy / item.apy) * 100}%"></div>
                        </div>
                        <div class="bar-value">${item.baseApy}%</div>
                    </div>
                    <div class="breakdown-bar">
                        <div class="bar-label">代币补贴收益</div>
                        <div class="bar-container">
                            <div class="bar-fill bar-reward" style="width: ${(item.rewardApy / item.apy) * 100}%"></div>
                        </div>
                        <div class="bar-value">${item.rewardApy}%</div>
                    </div>
                </div>
                <div class="breakdown-note">
                    <span class="note-safe">🟢 稳定收益</span>
                    <span class="note-risk">🟡 可能波动</span>
                </div>
            </div>
            <div class="lst-earnings">
                <div class="earnings-item">
                    <span>${t('dailyEarnings')}</span>
                    <strong>${earnings.daily.toFixed(4)} SOL</strong>
                </div>
                <div class="earnings-item">
                    <span>${t('weeklyEarnings')}</span>
                    <strong>${earnings.weekly.toFixed(3)} SOL</strong>
                </div>
                <div class="earnings-item">
                    <span>${t('monthlyEarnings')}</span>
                    <strong>${earnings.monthly.toFixed(2)} SOL</strong>
                </div>
                <div class="earnings-item">
                    <span>${t('yearlyEarnings')}</span>
                    <strong>${earnings.yearly.toFixed(2)} SOL</strong>
                </div>
            </div>
            <div class="lst-details" id="details-${index}" style="display: none;">
                <div class="details-grid">
                    <div class="detail-item">
                        <span>${t('depositFee')}</span>
                        <strong>${item.depositFee}%</strong>
                    </div>
                    <div class="detail-item">
                        <span>${t('unstakeFee')}</span>
                        <strong>${item.unstakeFee}%</strong>
                    </div>
                    <div class="detail-item">
                        <span>${t('unstakeTime')}</span>
                        <strong>${item.unstakeTime}</strong>
                    </div>
                    <div class="detail-item">
                        <span>${t('launchTime')}</span>
                        <strong>${item.launchTime}</strong>
                    </div>
                    <div class="detail-item">
                        <span>${t('auditStatus')}</span>
                        <strong>${item.auditStatus}</strong>
                    </div>
                </div>
                <div class="risk-report">
                    <h4>📋 ${t('protocolRisk')}</h4>
                    <p><strong>${t('safetyRating')}:</strong> ${item.risk === 'safe' ? '高' : item.risk === 'medium' ? '中' : '低'}</p>
                    <p><strong>${t('auditInfo')}:</strong> ${item.auditStatus}</p>
                    <p><strong>${t('liquidityInfo')}:</strong> ${item.tvl > 500000000 ? '高' : item.tvl > 100000000 ? '中' : '低'}</p>
                </div>
            </div>
            <div class="lst-actions">
                <button class="btn btn-primary" onclick="navigateToProtocolDetail('${item.ticker}')">
                    ${t('stake')}
                </button>
                <button class="btn btn-secondary" onclick="${isFavorite ? 'removeFromFavorites' : 'addToFavorites'}('${item.ticker}')">
                    ${isFavorite ? t('removeFromFavorites') : t('addToFavorites')}
                </button>
                <button class="btn btn-compare" onclick="${isInCompare ? 'removeFromCompare' : 'addToCompare'}('${item.ticker}')">
                    ${isInCompare ? t('removeFromCompare') : t('addToCompare')}
                </button>
                <button class="btn btn-info" onclick="toggleDetail(${index})">
                    详情
                </button>
            </div>
        `;

        container.appendChild(lstCard);
    });
}

// 切换详情显示
function toggleDetail(index) {
    const details = document.getElementById(`details-${index}`);
    if (details.style.display === 'none') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}

// 添加到收藏
function addToFavorites(ticker) {
    if (!favoriteList.includes(ticker)) {
        favoriteList.push(ticker);
        localStorage.setItem('favorites', JSON.stringify(favoriteList));
        if (currentTab === 'favorites') {
            renderLstList();
        }
    }
}

// 从收藏中移除
function removeFromFavorites(ticker) {
    favoriteList = favoriteList.filter(item => item !== ticker);
    localStorage.setItem('favorites', JSON.stringify(favoriteList));
    if (currentTab === 'favorites') {
        renderLstList();
    }
}

// 更新对比徽章
function updateCompareBadge() {
    const badge = document.getElementById('compare-badge');
    const mobileBadge = document.getElementById('mobile-compare-badge');
    const count = compareList.length;
    
    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    if (mobileBadge) {
        if (count > 0) {
            mobileBadge.textContent = count;
            mobileBadge.style.display = 'inline-flex';
        } else {
            mobileBadge.style.display = 'none';
        }
    }
}

// 添加到对比
function addToCompare(ticker) {
    if (!compareList.includes(ticker) && compareList.length < 4) {
        compareList.push(ticker);
        localStorage.setItem('compareList', JSON.stringify(compareList));
        updateCompareBadge();
        if (currentTab === 'compare') {
            renderComparisonTable();
        }
    }
}

// 从对比中移除
function removeFromCompare(ticker) {
    compareList = compareList.filter(item => item !== ticker);
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareBadge();
    if (currentTab === 'compare') {
        renderComparisonTable();
    }
}

// 显示对比模态框
function showCompareModal() {
    const modal = document.getElementById('compare-modal');
    if (modal) {
        // 填充协议列表
        const protocolsList = document.getElementById('compare-protocols-list');
        if (protocolsList) {
            protocolsList.innerHTML = lstData.map(item => `
                <div class="protocol-item">
                    <input type="checkbox" id="compare-${item.ticker}" ${compareList.includes(item.ticker) ? 'checked' : ''} onchange="toggleCompare('${item.ticker}', this.checked)">
                    <label for="compare-${item.ticker}">${item.name} (${item.ticker}) - ${item.apy}% APY</label>
                </div>
            `).join('');
        }
        modal.classList.add('active');
    }
}

// 关闭对比模态框
function closeCompareModal() {
    const modal = document.getElementById('compare-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 切换对比状态
function toggleCompare(ticker, checked) {
    if (checked) {
        if (!compareList.includes(ticker) && compareList.length < 4) {
            compareList.push(ticker);
        }
    } else {
        compareList = compareList.filter(item => item !== ticker);
    }
}

// 更新对比
function updateComparison() {
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareBadge();
    closeCompareModal();
    
    // 如果有协议被选中，导航到对比页面
    if (compareList.length > 0) {
        navigateToPage('compare');
    }
}

// 关闭模态框
function closeModal() {
    // 兼容旧的模态框关闭
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// 清空对比
function clearCompare() {
    compareList = [];
    localStorage.setItem('compareList', JSON.stringify(compareList));
    updateCompareBadge();
    renderComparisonTable();
}

// 渲染对比表格
function renderComparisonTable() {
    const table = document.getElementById('compare-table');
    const tbody = document.getElementById('compare-body');
    const compareContainer = document.querySelector('.compare-container');
    const compareEmpty = document.getElementById('compare-empty');

    // 检查是否有协议要比较
    if (compareList.length === 0) {
        compareContainer.style.display = 'none';
        compareEmpty.style.display = 'block';
        return;
    }

    compareContainer.style.display = 'block';
    compareEmpty.style.display = 'none';

    // 清空表格
    table.querySelector('thead tr').innerHTML = '<th>指标</th>';
    tbody.innerHTML = '';

    // 添加协议列
    compareList.forEach(ticker => {
        const protocol = lstData.find(item => item.ticker === ticker);
        if (protocol) {
            table.querySelector('thead tr').innerHTML += `<th>${protocol.name}<br><small>${protocol.ticker}</small></th>`;
        }
    });

    // 假设通胀率为 2%
    const inflationRate = 2;

    // 添加数据行
    const rows = [
        { label: t('apy'), key: 'apy', format: value => value + '%' },
        { label: t('sevenDayEarnings'), key: 'apy', format: value => ((parseFloat(value) / 100 / 365 * 7) * 100).toFixed(3) + '%' },
        { label: t('thirtyDayEarnings'), key: 'apy', format: value => ((parseFloat(value) / 100 / 365 * 30) * 100).toFixed(3) + '%' },
        { label: t('oneYearCompound'), key: 'apy', format: value => ((Math.pow(1 + parseFloat(value) / 100 / 365, 365) - 1) * 100).toFixed(3) + '%' },
        { label: t('realYield'), key: 'apy', format: value => (parseFloat(value) - inflationRate).toFixed(2) + '%' },
        { label: t('tvl'), key: 'tvl', format: value => '$' + formatNumber(value) },
        { label: t('risk'), key: 'risk', format: value => getRiskText(value) },
        { label: t('rating'), key: 'rating', format: value => value + '/5' },
        { label: t('depositFee'), key: 'depositFee', format: value => value + '%' },
        { label: t('unstakeFee'), key: 'unstakeFee', format: value => value + '%' },
        { label: t('unstakeTime'), key: 'unstakeTime' },
        { label: t('launchTime'), key: 'launchTime' },
        { label: t('auditStatus'), key: 'auditStatus' }
    ];

    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td><strong>${row.label}</strong></td>`;

        compareList.forEach(ticker => {
            const protocol = lstData.find(item => item.ticker === ticker);
            if (protocol) {
                const value = protocol[row.key];
                const formattedValue = row.format ? row.format(value) : value;
                tr.innerHTML += `<td>${formattedValue}</td>`;
            }
        });

        tbody.appendChild(tr);
    });
}

// 显示组合优化器
function showPortfolioOptimizer() {
    alert('组合优化功能即将上线，敬请期待！');
}

// 显示 Gas 优化器
function showGasOptimizer() {
    alert('Gas 优化功能即将上线，敬请期待！');
}

// 选择精选 LST
function selectFeaturedLST(lstName) {
    // 查找协议
    const protocol = lstData.find(item => item.name === lstName);
    if (protocol) {
        selectedProtocol = protocol;
    }
    
    // 导航到协议页面
    navigateToPage('protocols');

    // 搜索并过滤对应协议
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.value = lstName;
        renderLstList();
    }
}

// 切换协议详情页标签
function switchProtocolTab(tabName) {
    // 更新标签状态
    document.querySelectorAll('.protocol-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // 显示/隐藏对应内容
    document.querySelectorAll('.protocol-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// 导航到协议详情页
function navigateToProtocolDetail(ticker) {
    const protocol = lstData.find(item => item.ticker === ticker);
    if (!protocol) return;

    // 导航到详情页
    navigateToPage('protocol-detail');

    // 填充协议详情
    document.getElementById('protocol-detail-icon').textContent = protocol.icon;
    document.getElementById('protocol-detail-title').textContent = `${protocol.name} (${protocol.ticker})`;
    document.getElementById('protocol-detail-description').textContent = protocol.description;
    document.getElementById('protocol-detail-risk').textContent = getRiskText(protocol.risk);
    document.getElementById('protocol-detail-risk').style.color = getRiskColor(protocol.risk);
    document.getElementById('protocol-detail-risk').style.backgroundColor = `${getRiskColor(protocol.risk)}20`;
    document.getElementById('protocol-detail-apy').textContent = `${protocol.apy}%`;
    document.getElementById('protocol-detail-tvl').textContent = `$${formatNumber(protocol.tvl)}`;
    document.getElementById('protocol-detail-rating').textContent = `${protocol.rating}/5`;

    // 填充详细信息
    document.getElementById('detail-deposit-fee').textContent = `${protocol.depositFee}%`;
    document.getElementById('detail-unstake-fee').textContent = `${protocol.unstakeFee}%`;
    document.getElementById('detail-unstake-time').textContent = protocol.unstakeTime;
    document.getElementById('detail-launch-time').textContent = protocol.launchTime;
    document.getElementById('detail-audit-status').textContent = protocol.auditStatus;

    // 填充风险分析
    const safetyRating = protocol.risk === 'safe' ? '高' : protocol.risk === 'medium' ? '中' : '低';
    document.getElementById('risk-safety-rating').textContent = safetyRating;
    document.getElementById('risk-audit-info').textContent = protocol.auditStatus === 'Audited' ? '协议已通过多家知名审计机构的审计。' : '协议部分审计或未审计，存在一定风险。';

    const liquidity = protocol.tvl > 500000000 ? '高流动性，市场深度良好。' : protocol.tvl > 100000000 ? '中等流动性，市场深度一般。' : '低流动性，市场深度较浅。';
    document.getElementById('risk-liquidity').textContent = liquidity;

    const protocolRisk = protocol.risk === 'safe' ? '低风险，代码质量高，社区活跃。' : protocol.risk === 'medium' ? '中等风险，建议谨慎投资。' : '高风险，不建议大额投资。';
    document.getElementById('risk-protocol').textContent = protocolRisk;

    // 填充概览
    document.getElementById('protocol-overview-text').textContent = protocol.description;

    // 更新收益计算器
    updateProtocolEarningsCalculator(protocol.apy);

    // 更新按钮状态
    const isFavorite = favoriteList.includes(protocol.ticker);
    const isInCompare = compareList.includes(protocol.ticker);

    document.getElementById('protocol-favorite-btn').textContent = isFavorite ? t('removeFromFavorites') : t('addToFavorites');
    document.getElementById('protocol-favorite-btn').onclick = function () {
        isFavorite ? removeFromFavorites(protocol.ticker) : addToFavorites(protocol.ticker);
        document.getElementById('protocol-favorite-btn').textContent = !isFavorite ? t('removeFromFavorites') : t('addToFavorites');
    };

    document.getElementById('protocol-compare-btn').textContent = isInCompare ? t('removeFromCompare') : t('addToCompare');
    document.getElementById('protocol-compare-btn').onclick = function () {
        isInCompare ? removeFromCompare(protocol.ticker) : addToCompare(protocol.ticker);
        document.getElementById('protocol-compare-btn').textContent = !isInCompare ? t('removeFromCompare') : t('addToCompare');
    };

    document.getElementById('protocol-stake-btn').onclick = function () {
        stakeNow(protocol.ticker);
    };
}

// 更新协议详情页的收益计算器
function updateProtocolEarningsCalculator(apy) {
    const solAmount = parseFloat(document.getElementById('earnings-sol-amount').value) || 10;
    const earnings = calculateEarnings(solAmount, apy);

    document.getElementById('earnings-daily').textContent = earnings.daily.toFixed(4) + ' SOL';
    document.getElementById('earnings-weekly').textContent = earnings.weekly.toFixed(3) + ' SOL';
    document.getElementById('earnings-monthly').textContent = earnings.monthly.toFixed(2) + ' SOL';
    document.getElementById('earnings-yearly').textContent = earnings.yearly.toFixed(2) + ' SOL';
    document.getElementById('earnings-compound').textContent = earnings.compound.toFixed(2) + ' SOL';
}

// 切换质押方式
function switchStakeMethod(method) {
    const tabs = document.querySelectorAll('.stake-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

// 更新 Hero 计算器
function updateHeroCalculator() {
    const solAmount = parseFloat(document.getElementById('hero-sol-amount').value) || 0;
    const avgAPY = 6.5;
    const yearlyRewards = solAmount * (avgAPY / 100);

    document.getElementById('calc-rewards-year').textContent = yearlyRewards.toFixed(2) + ' SOL';
    document.getElementById('calc-receive').textContent = (solAmount + yearlyRewards).toFixed(2) + ' LST';
}

// 质押按钮
function stakeNow(ticker) {
    const solAmount = document.getElementById('hero-sol-amount') ? document.getElementById('hero-sol-amount').value : '10';
    
    // 优先使用传入的 ticker，否则使用选中的协议，最后选择 APY 最高的协议
    let protocol = null;
    if (ticker) {
        protocol = lstData.find(item => item.ticker === ticker);
    } else if (selectedProtocol) {
        protocol = selectedProtocol;
    } else {
        // 选择 APY 最高的协议
        protocol = lstData.reduce((prev, current) => {
            return parseFloat(current.apy) > parseFloat(prev.apy) ? current : prev;
        });
    }
    
    const protocolName = protocol ? protocol.name : 'LST';
    const officialUrl = protocol ? protocol.officialUrl : null;
    
    if (currentLanguage === 'zh') {
        if (officialUrl) {
            if (confirm(`确认质押 ${solAmount} SOL 到 ${protocolName}？\n\n这将跳转到 ${protocolName} 的官方网站进行质押。`)) {
                window.open(officialUrl, '_blank');
            }
        } else {
            alert(`质押 ${solAmount} SOL 到 ${protocolName}\n\n在生产环境中，这将连接您的钱包并进行质押。`);
        }
    } else {
        if (officialUrl) {
            if (confirm(`Confirm staking ${solAmount} SOL to ${protocolName}?\n\nThis will redirect to ${protocolName}'s official website.`)) {
                window.open(officialUrl, '_blank');
            }
        } else {
            alert(`Stake ${solAmount} SOL to ${protocolName}\n\nIn a production environment, this would connect to your wallet and stake.`);
        }
    }
}

// 切换 FAQ
function toggleFaq(button) {
    const faqItem = button.parentElement;
    faqItem.classList.toggle('active');

    // 切换图标
    const icon = button.querySelector('.faq-icon');
    if (icon) {
        icon.textContent = faqItem.classList.contains('active') ? '−' : '+';
    }
}

// 初始化钱包
async function initWallet() {
    try {
        // 检查是否在浏览器环境
        if (typeof window === 'undefined') return;

        // 检查是否已安装钱包适配器
        if (!window.solana) {
            console.log('No Solana wallet detected');
            return;
        }

        // 初始化钱包
        wallet = window.solana;

        // 监听钱包连接状态
        wallet.on('connect', handleWalletConnect);
        wallet.on('disconnect', handleWalletDisconnect);
        wallet.on('accountChanged', handleAccountChange);

        // 检查是否已连接
        if (wallet.isConnected) {
            handleWalletConnect();
        }

    } catch (error) {
        console.error('Error initializing wallet:', error);
    }
}

// 处理钱包连接
async function handleWalletConnect() {
    try {
        if (wallet && wallet.isConnected) {
            walletAddress = wallet.publicKey.toString();
            console.log('Wallet connected:', walletAddress);

            // 更新UI
            updateWalletUI();

            // 获取SOL余额
            await fetchSolBalance();

            // 获取用户LST持仓
            await fetchUserLstHoldings();
        }
    } catch (error) {
        console.error('Error handling wallet connect:', error);
    }
}

// 处理钱包断开
function handleWalletDisconnect() {
    console.log('Wallet disconnected');
    walletAddress = null;
    solBalance = 0;
    userLstHoldings = [];
    updateWalletUI();
}

// 处理账户变更
async function handleAccountChange() {
    console.log('Account changed');
    await handleWalletConnect();
}

// 连接钱包
// 获取SOL余额
async function fetchSolBalance() {
    try {
        if (!walletAddress) return;

        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        const publicKey = new solanaWeb3.PublicKey(walletAddress);
        const balance = await connection.getBalance(publicKey);
        solBalance = balance / solanaWeb3.LAMPORTS_PER_SOL;
        console.log('SOL balance:', solBalance);
        updateWalletUI();
    } catch (error) {
        console.error('Error fetching SOL balance:', error);
    }
}

// 获取用户LST持仓
async function fetchUserLstHoldings() {
    try {
        if (!walletAddress) return;

        // 这里需要为每个LST代币添加对应的代币地址
        // 以下是示例地址，实际项目中需要替换为真实的代币地址
        const lstTokens = {
            'jitoSOL': 'J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kG3Y',
            'mSOL': 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
            'stSOL': '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj'
            // 可以添加更多LST代币地址
        };

        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        const publicKey = new solanaWeb3.PublicKey(walletAddress);

        userLstHoldings = [];

        for (const [ticker, mintAddress] of Object.entries(lstTokens)) {
            try {
                const tokenAccount = await connection.getTokenAccountsByOwner(
                    publicKey,
                    { mint: new solanaWeb3.PublicKey(mintAddress) }
                );

                if (tokenAccount.value.length > 0) {
                    const accountInfo = await connection.getAccountInfo(tokenAccount.value[0].pubkey);
                    if (accountInfo) {
                        const tokenAmount = solanaWeb3.AccountLayout.decode(accountInfo.data).amount;
                        const decimalPlaces = 9; // 大多数LST代币的小数位数
                        const balance = tokenAmount / Math.pow(10, decimalPlaces);

                        if (balance > 0) {
                            userLstHoldings.push({
                                ticker,
                                balance,
                                mintAddress
                            });
                        }
                    }
                }
            } catch (error) {
                console.warn(`Error fetching ${ticker} balance:`, error);
            }
        }

        console.log('User LST holdings:', userLstHoldings);
        updateWalletUI();
    } catch (error) {
        console.error('Error fetching user LST holdings:', error);
    }
}

// 更新钱包UI
function updateWalletUI() {
    const walletButton = document.getElementById('wallet-connect-btn');
    const walletInfo = document.getElementById('wallet-info');

    if (walletButton) {
        if (walletAddress) {
            walletButton.textContent = '断开钱包';
            walletButton.onclick = disconnectWallet;
        } else {
            walletButton.textContent = '连接钱包';
            walletButton.onclick = connectWallet;
        }
    }

    if (walletInfo) {
        if (walletAddress) {
            walletInfo.style.display = 'block';
            walletInfo.innerHTML = `
                <div class="wallet-address">${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}</div>
                <div class="wallet-balance">SOL: ${solBalance.toFixed(4)}</div>
            `;
        } else {
            walletInfo.style.display = 'none';
        }
    }

    // 更新仪表盘页面的持仓显示
    updateHoldingsDisplay();
}

// 更新持仓显示
function updateHoldingsDisplay() {
    const holdingsEmpty = document.getElementById('holdings-empty');
    const holdingsContent = document.getElementById('holdings-content');
    const holdingsList = document.getElementById('holdings-list');
    const totalHoldingsValue = document.getElementById('total-holdings-value');
    const dailyEarnings = document.getElementById('daily-earnings');
    const annualEarnings = document.getElementById('annual-earnings');

    if (holdingsEmpty && holdingsContent) {
        if (walletAddress && userLstHoldings.length > 0) {
            holdingsEmpty.style.display = 'none';
            holdingsContent.style.display = 'block';

            // 计算总持仓价值和收益
            let totalValue = 0;
            let totalDailyEarnings = 0;
            let totalAnnualEarnings = 0;

            // 清空持仓列表
            if (holdingsList) {
                holdingsList.innerHTML = '';
            }

            // 遍历用户持仓
            userLstHoldings.forEach(holding => {
                const protocol = lstData.find(p => p.ticker === holding.ticker);
                if (protocol) {
                    // 计算持仓价值（假设1 SOL = $100，实际项目中应该使用真实价格）
                    const solPrice = 100;
                    const value = holding.balance * solPrice;
                    totalValue += value;

                    // 计算每日收益
                    const dailyEarning = (holding.balance * parseFloat(protocol.apy) / 100) / 365;
                    totalDailyEarnings += dailyEarning;

                    // 计算年化收益
                    const annualEarning = holding.balance * parseFloat(protocol.apy) / 100;
                    totalAnnualEarnings += annualEarning;

                    // 创建持仓项
                    if (holdingsList) {
                        const holdingItem = document.createElement('div');
                        holdingItem.className = 'holding-item';
                        holdingItem.innerHTML = `
                            <div class="holding-info">
                                <div class="holding-icon">${protocol.icon}</div>
                                <div class="holding-details">
                                    <h4>${protocol.name} (${holding.ticker})</h4>
                                    <p>APY: ${protocol.apy}%</p>
                                </div>
                            </div>
                            <div class="holding-value">
                                <div class="holding-balance">${holding.balance.toFixed(4)} ${holding.ticker}</div>
                                <div class="holding-earnings">每日: ${dailyEarning.toFixed(6)} SOL</div>
                            </div>
                        `;
                        holdingsList.appendChild(holdingItem);
                    }
                }
            });

            // 更新总持仓价值和收益
            if (totalHoldingsValue) {
                totalHoldingsValue.textContent = `$${totalValue.toFixed(2)}`;
            }
            if (dailyEarnings) {
                dailyEarnings.textContent = `${totalDailyEarnings.toFixed(6)} SOL`;
            }
            if (annualEarnings) {
                const avgApy = (totalAnnualEarnings / userLstHoldings.reduce((sum, h) => sum + h.balance, 0)) * 100;
                annualEarnings.textContent = `${avgApy.toFixed(2)}%`;
            }
        } else {
            holdingsEmpty.style.display = 'block';
            holdingsContent.style.display = 'none';
        }
    }
}

// 智能推荐算法 - 根据用户风险偏好生成推荐
function generateRecommendations(riskProfile) {
    if (!lstData || lstData.length === 0) {
        return [];
    }

    let recommendedProtocols = [...lstData];

    switch (riskProfile) {
        case 'conservative':
            recommendedProtocols = recommendedProtocols
                .filter(p => p.risk === 'safe')
                .sort((a, b) => {
                    if (b.rating !== a.rating) return b.rating - a.rating;
                    return b.tvl - a.tvl;
                });
            break;
        case 'balanced':
            recommendedProtocols = recommendedProtocols
                .filter(p => p.risk !== 'caution')
                .sort((a, b) => {
                    const scoreA = (parseFloat(a.apy) || 0) * 0.6 + (a.rating || 0) * 0.4;
                    const scoreB = (parseFloat(b.apy) || 0) * 0.6 + (b.rating || 0) * 0.4;
                    return scoreB - scoreA;
                });
            break;
        case 'aggressive':
            recommendedProtocols = recommendedProtocols
                .sort((a, b) => (parseFloat(b.apy) || 0) - (parseFloat(a.apy) || 0));
            break;
    }

    return recommendedProtocols.slice(0, 5);
}

// 生成LST组合建议
function generatePortfolio(protocols, riskProfile, totalSol = 100) {
    if (!protocols || protocols.length === 0) {
        return [];
    }

    const recommendations = [];

    if (riskProfile === 'conservative' || protocols.length === 1) {
        recommendations.push({
            protocol: protocols[0],
            percentage: 100,
            amount: totalSol,
            yearlyEarnings: totalSol * (parseFloat(protocols[0].apy) || 0) / 100
        });
    } else if (riskProfile === 'balanced') {
        if (protocols.length >= 2) {
            recommendations.push({
                protocol: protocols[0],
                percentage: 60,
                amount: totalSol * 0.6,
                yearlyEarnings: totalSol * 0.6 * (parseFloat(protocols[0].apy) || 0) / 100
            });
            recommendations.push({
                protocol: protocols[1],
                percentage: 40,
                amount: totalSol * 0.4,
                yearlyEarnings: totalSol * 0.4 * (parseFloat(protocols[1].apy) || 0) / 100
            });
        } else {
            recommendations.push({
                protocol: protocols[0],
                percentage: 100,
                amount: totalSol,
                yearlyEarnings: totalSol * (parseFloat(protocols[0].apy) || 0) / 100
            });
        }
    } else {
        if (protocols.length >= 3) {
            recommendations.push({
                protocol: protocols[0],
                percentage: 50,
                amount: totalSol * 0.5,
                yearlyEarnings: totalSol * 0.5 * (parseFloat(protocols[0].apy) || 0) / 100
            });
            recommendations.push({
                protocol: protocols[1],
                percentage: 30,
                amount: totalSol * 0.3,
                yearlyEarnings: totalSol * 0.3 * (parseFloat(protocols[1].apy) || 0) / 100
            });
            recommendations.push({
                protocol: protocols[2],
                percentage: 20,
                amount: totalSol * 0.2,
                yearlyEarnings: totalSol * 0.2 * (parseFloat(protocols[2].apy) || 0) / 100
            });
        } else if (protocols.length === 2) {
            recommendations.push({
                protocol: protocols[0],
                percentage: 70,
                amount: totalSol * 0.7,
                yearlyEarnings: totalSol * 0.7 * (parseFloat(protocols[0].apy) || 0) / 100
            });
            recommendations.push({
                protocol: protocols[1],
                percentage: 30,
                amount: totalSol * 0.3,
                yearlyEarnings: totalSol * 0.3 * (parseFloat(protocols[1].apy) || 0) / 100
            });
        } else {
            recommendations.push({
                protocol: protocols[0],
                percentage: 100,
                amount: totalSol,
                yearlyEarnings: totalSol * (parseFloat(protocols[0].apy) || 0) / 100
            });
        }
    }

    return recommendations;
}

// 获取智能推荐结果
function getSmartRecommendations(riskProfile) {
    const protocols = generateRecommendations(riskProfile);
    const portfolio = generatePortfolio(protocols, riskProfile);

    const totalYearlyEarnings = portfolio.reduce((sum, p) => sum + p.yearlyEarnings, 0);

    return {
        protocols: protocols.slice(0, 3),
        portfolio: portfolio,
        totalYearlyEarnings: totalYearlyEarnings,
        riskProfile: riskProfile
    };
}

// 选择风险偏好并显示推荐
function selectRiskProfile(profile) {
    const buttons = document.querySelectorAll('.profile-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.profile === profile) {
            btn.classList.add('active');
        }
    });

    const recommendations = getSmartRecommendations(profile);
    renderRecommendations(recommendations);
}

// 渲染推荐结果
function renderRecommendations(recommendations) {
    const portfolioList = document.getElementById('portfolio-list');
    const recommendedProtocols = document.getElementById('recommended-protocols');
    const totalEarnings = document.getElementById('total-yearly-earnings');

    if (!portfolioList || !recommendedProtocols || !totalEarnings) {
        return;
    }

    portfolioList.innerHTML = '';
    recommendedProtocols.innerHTML = '';

    if (!recommendations.portfolio || recommendations.portfolio.length === 0) {
        portfolioList.innerHTML = '<p class="no-data">暂无推荐</p>';
        totalEarnings.textContent = '0 SOL';
        return;
    }

    recommendations.portfolio.forEach(item => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `
            <div class="portfolio-protocol">
                <span class="portfolio-icon">${item.protocol.icon || '📦'}</span>
                <span class="portfolio-name">${item.protocol.name}</span>
            </div>
            <div class="portfolio-allocation">
                <span class="portfolio-percentage">${item.percentage}%</span>
                <span class="portfolio-amount">${item.amount.toFixed(2)} SOL</span>
            </div>
            <div class="portfolio-earnings">
                年收益: ${item.yearlyEarnings.toFixed(2)} SOL
            </div>
        `;
        portfolioList.appendChild(div);
    });

    totalEarnings.textContent = recommendations.totalYearlyEarnings.toFixed(2) + ' SOL';

    recommendations.protocols.forEach(protocol => {
        const div = document.createElement('div');
        div.className = 'recommended-protocol-card';
        div.onclick = () => showProtocolDetail(protocol.name);
        div.innerHTML = `
            <div class="protocol-header">
                <span class="protocol-icon">${protocol.icon || '📦'}</span>
                <span class="protocol-name">${protocol.name}</span>
                <span class="risk-badge risk-${protocol.risk}">${getRiskText(protocol.risk)}</span>
            </div>
            <div class="protocol-metrics">
                <div class="metric">
                    <span class="metric-label">APY</span>
                    <span class="metric-value">${protocol.apy}%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">TVL</span>
                    <span class="metric-value">$${formatNumber(protocol.tvl)}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">评分</span>
                    <span class="metric-value">${protocol.rating}/5</span>
                </div>
            </div>
        `;
        recommendedProtocols.appendChild(div);
    });
}

// 页面加载时初始化
// 检查预警
function checkAlerts() {
    const alerts = [];

    // 检查 APY 突然下降
    lstData.forEach(protocol => {
        if (protocol.previousApy) {
            const currentApy = parseFloat(protocol.apy);
            const previousApy = parseFloat(protocol.previousApy);
            const apyChange = ((currentApy - previousApy) / previousApy) * 100;

            if (apyChange < -10) { // 下降超过10%
                alerts.push({
                    type: 'danger',
                    message: `${protocol.name} APY 突然下降 ${Math.abs(apyChange).toFixed(1)}%，当前为 ${currentApy}%`
                });
            }
        }

        // 检查异常波动
        if (protocol.apyHistory && protocol.apyHistory.length >= 3) {
            const recentApy = parseFloat(protocol.apy);
            const avgApy = protocol.apyHistory.reduce((sum, apy) => sum + parseFloat(apy), 0) / protocol.apyHistory.length;
            const deviation = Math.abs((recentApy - avgApy) / avgApy) * 100;

            if (deviation > 20) { // 偏差超过20%
                alerts.push({
                    type: 'warning',
                    message: `${protocol.name} APY 出现异常波动，当前为 ${recentApy}%`
                });
            }
        }
    });

    // 显示预警
    if (alerts.length > 0) {
        showAlerts(alerts);
    }

    // 更新历史数据
    lstData.forEach(protocol => {
        if (!protocol.apyHistory) {
            protocol.apyHistory = [];
        }
        protocol.apyHistory.push(protocol.apy);
        if (protocol.apyHistory.length > 10) {
            protocol.apyHistory.shift();
        }
        protocol.previousApy = protocol.apy;
    });
}

// 显示预警
function showAlerts(alerts) {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container';

    alerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert alert-${alert.type}`;
        alertElement.textContent = alert.message;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'alert-close';
        closeBtn.textContent = '×';
        closeBtn.onclick = () => alertElement.remove();

        alertElement.appendChild(closeBtn);
        alertContainer.appendChild(alertElement);
    });

    // 添加到页面
    document.body.appendChild(alertContainer);

    // 30秒后自动关闭
    setTimeout(() => {
        alertContainer.remove();
    }, 30000);
}

// 新手引导功能
let currentOnboardingStep = 1;

function showOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
        modal.style.display = 'flex';
        currentOnboardingStep = 1;
        updateOnboardingUI();
    }
}

function closeOnboarding() {
    const modal = document.getElementById('onboarding-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function nextOnboardingStep() {
    if (currentOnboardingStep < 4) {
        currentOnboardingStep++;
        updateOnboardingUI();
    }
}

function prevOnboardingStep() {
    if (currentOnboardingStep > 1) {
        currentOnboardingStep--;
        updateOnboardingUI();
    }
}

function updateOnboardingUI() {
    // 更新步骤指示器
    const stepIndicator = document.getElementById('onboarding-step');
    if (stepIndicator) {
        stepIndicator.textContent = `${currentOnboardingStep}/4`;
    }

    // 隐藏所有步骤
    document.querySelectorAll('.onboarding-step').forEach(step => {
        step.classList.remove('active');
    });

    // 显示当前步骤
    const currentStep = document.getElementById(`onboarding-step-${currentOnboardingStep}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }

    // 更新按钮状态
    const backBtn = document.getElementById('onboarding-back');
    const nextBtn = document.getElementById('onboarding-next');
    const startBtn = document.getElementById('onboarding-start');

    if (currentOnboardingStep === 1) {
        backBtn.style.display = 'none';
        nextBtn.style.display = 'block';
        startBtn.style.display = 'none';
    } else if (currentOnboardingStep === 4) {
        backBtn.style.display = 'block';
        nextBtn.style.display = 'none';
        startBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        startBtn.style.display = 'none';
    }
}

function startUsing() {
    closeOnboarding();
    localStorage.setItem('onboardingComplete', 'true');
}

window.addEventListener('DOMContentLoaded', function () {
    initNavigation();
    loadSavedTheme();
    updateUI();
    updateStaticContent();
    updateCompareBadge();

    // Hero calculator event listener
    const heroSolInput = document.getElementById('hero-sol-amount');
    if (heroSolInput) {
        heroSolInput.addEventListener('input', updateHeroCalculator);
    }

    // Protocol earnings calculator event listener
    const earningsSolInput = document.getElementById('earnings-sol-amount');
    if (earningsSolInput) {
        earningsSolInput.addEventListener('input', function () {
            const currentProtocol = document.getElementById('protocol-detail-title').textContent;
            const ticker = currentProtocol.match(/\((.*?)\)/)[1];
            const protocol = lstData.find(item => item.ticker === ticker);
            if (protocol) {
                updateProtocolEarningsCalculator(protocol.apy);
            }
        });
    }

    // 移动端导航事件
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function () {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
            
            // 更新移动端导航状态
            mobileNavItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 初始化钱包
    initWallet();

    // 初始加载数据
    fetchRealTimeData();

    // 启动自动数据刷新
    setInterval(fetchRealTimeData, API_CONFIG.refreshInterval);

    // 初始化推荐显示
    selectRiskProfile('balanced');

    // 检查是否需要显示新手引导
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (!onboardingComplete) {
        setTimeout(showOnboarding, 500);
    }
});

// 渲染仪表盘页面
function renderDashboard() {
    const dashboardSection = document.querySelector('.dashboard-section');
    if (!dashboardSection) return;

    dashboardSection.innerHTML = `
        <div class="dashboard-card">
            <h3>协议安全评分</h3>
            <div class="security-ratings">
                ${lstData.slice(0, 4).map(protocol => {
                    const score = protocol.risk === 'safe' ? (90 + Math.random() * 10).toFixed(1) : 
                                  protocol.risk === 'medium' ? (70 + Math.random() * 20).toFixed(1) : 
                                  (50 + Math.random() * 20).toFixed(1);
                    const width = parseFloat(score);
                    return `
                        <div class="security-rating-item">
                            <div class="rating-header">
                                <span class="protocol-name">${protocol.icon} ${protocol.name}</span>
                                <span class="rating-score">${score}/10</span>
                            </div>
                            <div class="rating-bar">
                                <div class="rating-fill" style="width: ${width}%; background: ${getRiskColor(protocol.risk)};"></div>
                            </div>
                            <div class="rating-details">
                                <span>审计: ${protocol.auditStatus}</span>
                                <span>TVL: $${formatNumber(protocol.tvl)}</span>
                                <span>评分: ${protocol.rating}/5</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>

        <div class="dashboard-card">
            <h3>TVL 趋势 (近6个月)</h3>
            <div class="tvl-trend">
                <div class="trend-chart">
                    <div class="chart-axis">
                        <div class="y-axis">
                            <span>$1.5B</span>
                            <span>$1.2B</span>
                            <span>$900M</span>
                            <span>$600M</span>
                            <span>$300M</span>
                            <span>$0</span>
                        </div>
                        <div class="x-axis">
                            <span>1月</span>
                            <span>2月</span>
                            <span>3月</span>
                            <span>4月</span>
                            <span>5月</span>
                            <span>6月</span>
                        </div>
                    </div>
                    <div class="chart-data">
                        <svg viewBox="0 0 400 200" class="chart-svg">
                            <defs>
                                <linearGradient id="jitoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
                                    <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0" />
                                </linearGradient>
                                <linearGradient id="marinadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.3" />
                                    <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
                                </linearGradient>
                            </defs>
                            <path d="M 20 160 Q 80 140 140 120 T 260 80 T 380 60" fill="none" stroke="#3b82f6" stroke-width="2"/>
                            <path d="M 20 180 Q 80 170 140 155 T 260 130 T 380 110" fill="none" stroke="#10b981" stroke-width="2"/>
                            <circle cx="20" cy="160" r="4" fill="#3b82f6"/>
                            <circle cx="80" cy="140" r="4" fill="#3b82f6"/>
                            <circle cx="140" cy="120" r="4" fill="#3b82f6"/>
                            <circle cx="200" cy="100" r="4" fill="#3b82f6"/>
                            <circle cx="260" cy="80" r="4" fill="#3b82f6"/>
                            <circle cx="320" cy="70" r="4" fill="#3b82f6"/>
                            <circle cx="380" cy="60" r="4" fill="#3b82f6"/>
                            <circle cx="20" cy="180" r="4" fill="#10b981"/>
                            <circle cx="80" cy="170" r="4" fill="#10b981"/>
                            <circle cx="140" cy="155" r="4" fill="#10b981"/>
                            <circle cx="200" cy="140" r="4" fill="#10b981"/>
                            <circle cx="260" cy="130" r="4" fill="#10b981"/>
                            <circle cx="320" cy="120" r="4" fill="#10b981"/>
                            <circle cx="380" cy="110" r="4" fill="#10b981"/>
                        </svg>
                    </div>
                    <div class="chart-legend">
                        <div class="legend-item"><span class="legend-color jito"></span><span>Jito</span></div>
                        <div class="legend-item"><span class="legend-color marinade"></span><span>Marinade</span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dashboard-card">
            <h3>协议安全历史</h3>
            <div class="black-history-check">
                ${lstData.slice(0, 4).map(protocol => `
                    <div class="history-item ${protocol.risk === 'safe' ? 'safe' : 'caution'}">
                        <div class="history-icon">${protocol.risk === 'safe' ? '✅' : '⚠️'}</div>
                        <div class="history-content">
                            <h4>${protocol.icon} ${protocol.name}</h4>
                            <p>${protocol.risk === 'safe' ? '无安全事件记录，代码质量高。' : '历史较短或TVL较小，建议谨慎投资。'}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="dashboard-card">
            <h3>实时 APY 排行</h3>
            <div class="apy-ranking">
                ${lstData.slice(0, 5).map((protocol, index) => `
                    <div class="ranking-item">
                        <span class="ranking-position">${index + 1}</span>
                        <span class="ranking-icon">${protocol.icon}</span>
                        <span class="ranking-name">${protocol.name}</span>
                        <span class="ranking-apy">${protocol.apy}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 渲染DeFi页面
function renderDeFiPage() {
    // 检查钱包连接状态
    const walletConnected = localStorage.getItem('walletConnected') === 'true';
    const portfolioContent = document.getElementById('defi-portfolio-content');

    if (portfolioContent) {
        if (walletConnected) {
            // 显示模拟的资产组合
            portfolioContent.innerHTML = `
                <div class="portfolio-total">
                    <div class="total-info">
                        <h3>总价值</h3>
                        <div class="total-value">$2,458.75</div>
                    </div>
                    <div class="total-chart">
                        <div style="width: 80px; height: 80px; background: conic-gradient(#6366f1 70%, #e0e7ff 70%); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <div style="width: 60px; height: 60px; background: var(--card-bg); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.875rem; font-weight: 600;">70%</div>
                        </div>
                    </div>
                </div>
                <div class="portfolio-items">
                    <div class="portfolio-item">
                        <div class="item-info">
                            <div class="item-logo">🔒</div>
                            <div class="item-details">
                                <h4>Solana (SOL)</h4>
                                <p>2.5 SOL</p>
                            </div>
                        </div>
                        <div class="item-value">
                            <div class="item-balance">$450.25</div>
                            <div class="item-value-usd">$450.25</div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="item-info">
                            <div class="item-logo">🚀</div>
                            <div class="item-details">
                                <h4>Jito (JIT)</h4>
                                <p>150 JIT</p>
                            </div>
                        </div>
                        <div class="item-value">
                            <div class="item-balance">$625.50</div>
                            <div class="item-value-usd">$625.50</div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="item-info">
                            <div class="item-logo">🐳</div>
                            <div class="item-details">
                                <h4>Orca (ORCA)</h4>
                                <p>80 ORCA</p>
                            </div>
                        </div>
                        <div class="item-value">
                            <div class="item-balance">$382.00</div>
                            <div class="item-value-usd">$382.00</div>
                        </div>
                    </div>
                    <div class="portfolio-item">
                        <div class="item-info">
                            <div class="item-logo">🏛️</div>
                            <div class="item-details">
                                <h4>Solend (SLND)</h4>
                                <p>200 SLND</p>
                            </div>
                        </div>
                        <div class="item-value">
                            <div class="item-balance">$1,001.00</div>
                            <div class="item-value-usd">$1,001.00</div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // 显示未连接钱包的提示
            portfolioContent.innerHTML = `
                <div class="portfolio-empty">
                    <p>请连接钱包查看您的 DeFi 资产</p>
                    <button class="btn btn-primary" onclick="connectWallet()">连接钱包</button>
                </div>
            `;
        }
    }
}

// 显示DeFi操作模态框
function showDeFiModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal defi-modal';

    let modalContent = '';
    switch (type) {
        case 'swap':
            modalContent = `
                <div class="modal-content">
                    <div class="defi-modal-header">
                        <h3>快速交易</h3>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="defi-modal-content">
                        <form class="defi-form" onsubmit="event.preventDefault(); executeSwap()">
                            <div class="defi-form-group">
                                <label for="swap-from">从</label>
                                <select id="swap-from">
                                    <option value="SOL">Solana (SOL)</option>
                                    <option value="USDC">USDC</option>
                                    <option value="JIT">Jito (JIT)</option>
                                    <option value="ORCA">Orca (ORCA)</option>
                                </select>
                            </div>
                            <div class="defi-form-group">
                                <label for="swap-amount">数量</label>
                                <input type="number" id="swap-amount" placeholder="输入数量" min="0.0001" step="0.0001">
                            </div>
                            <div class="defi-form-group">
                                <label for="swap-to">到</label>
                                <select id="swap-to">
                                    <option value="USDC">USDC</option>
                                    <option value="SOL">Solana (SOL)</option>
                                    <option value="JIT">Jito (JIT)</option>
                                    <option value="ORCA">Orca (ORCA)</option>
                                </select>
                            </div>
                            <div class="defi-form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">执行交易</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'liquidity':
            modalContent = `
                <div class="modal-content">
                    <div class="defi-modal-header">
                        <h3>流动性挖矿</h3>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="defi-modal-content">
                        <form class="defi-form" onsubmit="event.preventDefault(); addLiquidity()">
                            <div class="defi-form-group">
                                <label for="liquidity-pool">选择池</label>
                                <select id="liquidity-pool">
                                    <option value="SOL-USDC">SOL-USDC</option>
                                    <option value="JIT-USDC">JIT-USDC</option>
                                    <option value="ORCA-USDC">ORCA-USDC</option>
                                </select>
                            </div>
                            <div class="defi-form-group">
                                <label for="liquidity-amount">投入金额 (USDC)</label>
                                <input type="number" id="liquidity-amount" placeholder="输入金额" min="1" step="1">
                            </div>
                            <div class="defi-form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">添加流动性</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'lending':
            modalContent = `
                <div class="modal-content">
                    <div class="defi-modal-header">
                        <h3>借贷理财</h3>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="defi-modal-content">
                        <form class="defi-form" onsubmit="event.preventDefault(); lendAsset()">
                            <div class="defi-form-group">
                                <label for="lending-asset">资产类型</label>
                                <select id="lending-asset">
                                    <option value="USDC">USDC</option>
                                    <option value="SOL">Solana (SOL)</option>
                                    <option value="USDT">USDT</option>
                                </select>
                            </div>
                            <div class="defi-form-group">
                                <label for="lending-amount">数量</label>
                                <input type="number" id="lending-amount" placeholder="输入数量" min="1" step="1">
                            </div>
                            <div class="defi-form-actions">
                                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                                <button type="submit" class="btn btn-primary">存入资产</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
            break;
        case 'nft':
            modalContent = `
                <div class="modal-content">
                    <div class="defi-modal-header">
                        <h3>NFT 市场</h3>
                        <button class="modal-close" onclick="closeModal()">&times;</button>
                    </div>
                    <div class="defi-modal-content">
                        <div style="text-align: center; padding: 2rem;">
                            <p>正在连接到 Magic Eden NFT 市场...</p>
                            <button class="btn btn-primary" onclick="connectToNFTMarket()">浏览 NFT</button>
                        </div>
                    </div>
                </div>
            `;
            break;
    }

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    modal.classList.add('active');
}

// 连接到DeFi协议
function connectToProtocol(protocol) {
    // 模拟连接到不同的DeFi协议
    const protocolInfo = {
        raydium: { name: 'Raydium', url: 'https://raydium.io' },
        orca: { name: 'Orca', url: 'https://www.orca.so' },
        solend: { name: 'Solend', url: 'https://solend.fi' },
        magiceden: { name: 'Magic Eden', url: 'https://magiceden.io' }
    };

    const info = protocolInfo[protocol];
    if (info) {
        showAlerts([{
            type: 'info',
            message: `正在连接到 ${info.name}...`
        }]);

        // 3秒后打开协议网站
        setTimeout(() => {
            window.open(info.url, '_blank');
        }, 1500);
    }
}

// 执行交易
function executeSwap() {
    const from = document.getElementById('swap-from').value;
    const to = document.getElementById('swap-to').value;
    const amount = document.getElementById('swap-amount').value;

    if (!amount || parseFloat(amount) <= 0) {
        showAlerts([{
            type: 'error',
            message: '请输入有效的交易数量'
        }]);
        return;
    }

    showAlerts([{
        type: 'success',
        message: `正在执行 ${amount} ${from} 到 ${to} 的交易...`
    }]);

    // 模拟交易过程
    setTimeout(() => {
        showAlerts([{
            type: 'success',
            message: `交易成功！已将 ${amount} ${from} 兑换为 ${(parseFloat(amount) * 0.99).toFixed(4)} ${to}`
        }]);
        closeModal();
    }, 2000);
}

// 添加流动性
function addLiquidity() {
    const pool = document.getElementById('liquidity-pool').value;
    const amount = document.getElementById('liquidity-amount').value;

    if (!amount || parseFloat(amount) <= 0) {
        showAlerts([{
            type: 'error',
            message: '请输入有效的金额'
        }]);
        return;
    }

    showAlerts([{
        type: 'success',
        message: `正在向 ${pool} 池添加 ${amount} USDC 的流动性...`
    }]);

    // 模拟添加过程
    setTimeout(() => {
        showAlerts([{
            type: 'success',
            message: `流动性添加成功！您将获得 ${(parseFloat(amount) * 1.05).toFixed(2)} 个 LP 代币`
        }]);
        closeModal();
    }, 2000);
}

// 存入资产
function lendAsset() {
    const asset = document.getElementById('lending-asset').value;
    const amount = document.getElementById('lending-amount').value;

    if (!amount || parseFloat(amount) <= 0) {
        showAlerts([{
            type: 'error',
            message: '请输入有效的金额'
        }]);
        return;
    }

    showAlerts([{
        type: 'success',
        message: `正在存入 ${amount} ${asset}...`
    }]);

    // 模拟存入过程
    setTimeout(() => {
        showAlerts([{
            type: 'success',
            message: `存入成功！您将获得年化 ${(Math.random() * 5 + 2).toFixed(2)}% 的收益`
        }]);
        closeModal();
    }, 2000);
}

// 连接到NFT市场
function connectToNFTMarket() {
    showAlerts([{
        type: 'info',
        message: '正在打开 Magic Eden NFT 市场...'
    }]);

    // 打开Magic Eden网站
    setTimeout(() => {
        window.open('https://magiceden.io', '_blank');
        closeModal();
    }, 1500);
}

// 连接钱包
function connectWallet() {
    showAlerts([{
        type: 'info',
        message: '正在连接钱包...'
    }]);

    // 模拟钱包连接过程
    setTimeout(() => {
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAddress', '0x' + Math.random().toString(16).substr(2, 40));
        showAlerts([{
            type: 'success',
            message: '钱包连接成功！'
        }]);
        // 重新渲染DeFi页面
        renderDeFiPage();
    }, 2000);
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}
