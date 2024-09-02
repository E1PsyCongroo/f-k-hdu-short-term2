import { useConsumeStore, useMemberStore } from '@/stores';
const consumeStore = useConsumeStore();
const memberStore = useMemberStore();

export const useLineConfig = (member_id, date, type) => {
  let name = '';
  let dataList = [];

  const currentDate = date || new Date().toISOString().slice(0, 7);

  if (member_id && member_id !== 0) {
    const member = memberStore.members.find((item) => item.member_id === member_id);
    console.log(memberStore.members)
    console.log(member)
    name = member ? member.name : '';
  } else {
    name = '';
  }

  if (type === 'income') {
    dataList = consumeStore.incomeList;
  } else if (type === 'outcome') {
    dataList = consumeStore.outcomeList;
  } else {
    dataList = consumeStore.consumeList;
  }

  const processData = (list) => {
    const filteredData = list.filter(item => item.member_id === member_id && item.consumeDate.startsWith(currentDate));

    const dailyTotals = {};
    filteredData.forEach(item => {
        const date = item.consumeDate;
        if (!dailyTotals[date]) {
            dailyTotals[date] = { income: 0, outcome: 0 };
        }
        if (item.transactionType === 1) {
            dailyTotals[date].income += item.amount;
        } else if (item.transactionType === 0) {
            dailyTotals[date].outcome += item.amount;
        }
    });

    return Object.keys(dailyTotals).map(date => ({
      date,
      net: dailyTotals[date].income - dailyTotals[date].outcome
    })).sort((a, b) => a.date.localeCompare(b.date));
  };

  const processedData = processData(dataList);
  console.log(processedData)

  const optionPost = {
    title: {
      text: `${name} ${currentDate} 开支`,
      bottom: '10',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: processedData.map(data => data.date)
    },
    yAxis: {
      type: 'value',
      name: '开支'
    },
    series: [{
      data: processedData.map(data => data.net),
      type: 'line',
      smooth: false,
    }]
  };

  return { optionPost };
};
