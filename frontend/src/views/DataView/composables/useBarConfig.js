import { useConsumeStore, useMemberStore } from '@/stores'
const consumeStore = useConsumeStore()
const memberStore = useMemberStore()

export const useBarConfig = (date, type) => {
  const currentDate = date || new Date().toISOString().slice(0, 7);

  let dataList = [];
  if (type === 'income') {
    dataList = consumeStore.incomeList;
  } else if (type === 'outcome') {
    dataList = consumeStore.outcomeList;
  } else {
    dataList = consumeStore.consumeList;
  }

  const processData = (list) => {
    const membersTotal = memberStore.members.map(member => {
      const totals = list.reduce((acc, item) => {
        const isDateMatch = item.consumeDate.slice(0, 7) === currentDate;
        if (isDateMatch && item.member_id === member.member_id) {
          if (item.transactionType === 1) {
            acc.income += item.amount;
          } else if (item.transactionType === 0) {
            acc.outcome += item.amount;
          }
        }
        return acc;
      }, { income: 0, outcome: 0 });

      return {
        name: member.name,
        income: totals.income,
        outcome: -Math.abs(totals.outcome)
      };
    });
    return membersTotal;
  };

  const uniqueDataPost = processData(dataList);

  const optionPost = {
    title: {
      text: `${currentDate} 收支表`,
      bottom: '10',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['收入', '支出']
    },
    xAxis: {
      type: 'category',
      data: uniqueDataPost.map(data => data.name)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '收入',
        type: 'bar',
        stack: 'total',
        data: uniqueDataPost.map(data => data.income)
      },
      {
        name: '支出',
        type: 'bar',
        stack: 'total',
        data: uniqueDataPost.map(data => data.outcome)
      }
    ]
  };

  return { optionPost };
};
