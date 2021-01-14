import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from '../../components/HistoryBox';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import grinningImg from '../../assets/grinning.svg';

import { Container, Content } from './styles';

const Dashboard: React.FC = () => {

  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());


  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    });
  }, []);


  const years = useMemo(() => {

    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      }
    })
  }, []);


  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        }
        catch {
          throw new Error('Invalid amount! Amount must be number.');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);


  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        }
        catch {
          throw new Error('Invalid amount! Amount must be number.');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);


  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalExpenses, totalGains]);


  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Neste mês você gastou mais do que deveria.",
        footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
        icon: sadImg
      }
    }
    else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Neste mês você gastou exatamente o que ganhou.",
        footerText: "Tenha cuidado. No próximo tente poupar o seu dinheiro.",
        icon: grinningImg
      }
    }
    else {
      return {
        title: "Muito bem!",
        description: "Sua carteira está positiva!",
        footerText: "Continue assim. Considere investir o seu saldo.",
        icon: happyImg
      }
    }
  }, [totalBalance]);


  const relationExpensesVsGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = ((totalGains / total) * 100).toFixed(1);
    const percentExpenses = ((totalExpenses / total) * 100).toFixed(1);

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: Number(percentGains),
        color: "#F7931B"
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: Number(percentExpenses),
        color: "#E44C4E"
      }
    ];

    return data;

  }, [totalGains, totalExpenses]);


  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {

      let amountEntry = 0
      gains.forEach((gain) => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          }
          catch {
            throw new Error('amountEntry is invalid. amountEntry must be valid number.')
          }
        }
      });

      let amountOutput = 0
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          }
          catch {
            throw new Error('amountOutput is invalid. amountOutput must be valid number.')
          }
        }
      });

      return {
        monthNumber: month,
        month: listOfMonths[month].substr(0, 3),
        amountEntry,
        amountOutput
      }

    })
    // .filter(item => {
    //     const currentMonth = new Date().getMonth();
    //     const currentYear = new Date().getFullYear();

    //     return (
    //       yearSelected === currentMonth
    //         && item.monthNumber <= currentMonth
    //         || yearSelected < currentYear
    //     );
    // })
  }, [yearSelected]);


  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);

      setMonthSelected(parseMonth);
    }
    catch {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }


  const handleYearSelected = (year: string) => {
    try {
      const parseMonth = Number(year);

      setYearSelected(parseMonth);
    }
    catch {
      throw new Error('invalid year value. Is accept integer numbers.');
    }
  }


  return (
    <Container>
      <ContentHeader title="Dashboard" lineColor="#F7931B">
        <SelectInput
          options={months}
          defaultValue={monthSelected}
          onChange={({ target: { value } }) => handleMonthSelected(value)}
        />
        <SelectInput
          options={years}
          defaultValue={yearSelected}
          onChange={({ target: { value } }) => handleYearSelected(value)}
        />
      </ContentHeader>

      <Content>
        <WalletBox
          title="saldo"
          amount={Number(totalBalance)}
          footerlabel="atualizado com base nas entradas e saídas"
          color="#4E41F0"
          icon="dolar"
        />
        <WalletBox
          title="entradas"
          amount={Number(totalGains)}
          footerlabel="atualizado com base nas entradas e saídas"
          color="#F7931B"
          icon="arrowUp"
        />
        <WalletBox
          title="saídas"
          amount={Number(totalExpenses)}
          footerlabel="atualizado com base nas entradas e saídas"
          color="#E44C4E"
          icon="arrowDown"
        />

        <MessageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox data={relationExpensesVsGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />

      </Content>
    </Container>
  );
}

export default Dashboard;
