import React, { useMemo, useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import { Container, Content, Filters } from './styles';
import { parse } from 'path';

interface IRouteParams {
  match: {
    params: {
      type: string;
    }
  }
}

interface IData {
  id: string;
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {

  const [ data, setData ] = useState<IData[]>([]);
  const [ monthSelected, setMonthSelected ] = useState<number>(new Date().getMonth() + 1);
  const [ yearSelected, setYearSelected ] = useState<number>(new Date().getFullYear());
  const [ frequencyFilterSelected, setFrequencyFilterSelected ] = useState<string[]>(['recorrente', 'eventual']);

  const movimentType = match.params.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ? {
        title: 'Entradas',
        lineColor: '#4E41F0',
        data: gains
      }
      : {
        title: 'Saídas',
        lineColor: '#E44C4E',
        data: expenses
      }
  }, [movimentType]);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      }
    })
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    const { data } = pageData;

    data.forEach(item => {
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
  }, [pageData]);

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = frequencyFilterSelected.filter(item => item !== frequency);

      setFrequencyFilterSelected(filtered)
    } else {
      setFrequencyFilterSelected((prev) => [...prev, frequency]);
    }
  }

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);

      setMonthSelected(parseMonth);
    }
    catch(error) {
      throw new Error('invalid month value. Is accept 0 - 24.');
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseMonth = Number(year);

      setYearSelected(parseMonth);
    }
    catch(error) {
      throw new Error('invalid year value. Is accept integer.');
    }
  }

  useEffect(() => {

    const { data } = pageData;

    const filteredData = data.filter(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return month === monthSelected
        && year === yearSelected 
        && frequencyFilterSelected.includes(item.frequency);
    });

    const formattedData = filteredData.map(item => {
      return {
        id: uuid(),
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E'
      }
    });

    setData(formattedData);

  }, [pageData, monthSelected, yearSelected, data.length, frequencyFilterSelected]);

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

      <Filters>
        <button
          type="button"
          onClick={() => handleFrequencyClick('recorrente')}
          className={`
          tag-filter
          tag-filter-recurrent
          ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}
          `}
        >
          Recorrentes
        </button>

        <button
          type="button"
          onClick={() => handleFrequencyClick('eventual')}
          className={`
          tag-filter
          tag-filter-eventual
          ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}
          `}
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        { data.map(item => (
          <HistoryFinanceCard
            key={item.id}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        )) }
      </Content>
    </Container>
  );
}

export default List;
