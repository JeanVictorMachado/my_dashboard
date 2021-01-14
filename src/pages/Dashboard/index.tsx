import React, { useState, useMemo } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieChart from '../../components/PieChart';

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

        <PieChart />
      </Content>
    </Container>
  );
}

export default Dashboard;
