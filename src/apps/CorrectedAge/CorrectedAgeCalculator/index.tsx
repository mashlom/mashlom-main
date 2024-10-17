import { useState, useCallback } from 'react';
import { differenceInDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const FULL_TERM_WEEKS = 40;
const DAYS_IN_WEEK = 7;

function formatCommas(input: string): string {
  let trimmedString = input.trim();

  if (trimmedString.endsWith(',')) {
    trimmedString = trimmedString.slice(0, -1);
  }

  const lastCommaSpaceIndex = trimmedString.lastIndexOf(', ');
  if (lastCommaSpaceIndex !== -1) {
    trimmedString =
      trimmedString.slice(0, lastCommaSpaceIndex) +
      ' ו-' +
      trimmedString.slice(lastCommaSpaceIndex + 2);
  }

  return trimmedString.replace(/ו-יום/g, 'ויום').replace(/ו-שבוע/g, 'ושבוע');
}

export default function CorrectedAgeCalculator(): JSX.Element {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [gestationWeeks, setGestationWeeks] = useState<string>('');
  const [gestationDays, setGestationDays] = useState<string>('');
  const [ageToShow, setAgeToShow] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const isInputValid = useCallback(() => {
    const weeks = parseInt(gestationWeeks);
    const days = parseInt(gestationDays);
    return (
      birthDate !== null &&
      !isNaN(weeks) &&
      weeks >= 20 &&
      weeks <= 44 &&
      !isNaN(days) &&
      days >= 0 &&
      days <= 6
    );
  }, [birthDate, gestationWeeks, gestationDays]);

  const calculateAge = (
    birthDate: Date | null,
    gestationWeeks: string,
    gestationDays: string
  ): void => {
    if (!birthDate || !gestationWeeks) return;
    const weeks = parseInt(gestationWeeks);
    const days = parseInt(gestationDays) || 0;

    if (weeks >= 37) {
      setAgeToShow('התינוק אינו פג, ניתן להשתמש בגיל הכרונולוגי');
      setIsCalculated(true);
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);

    const totalGestationDays = weeks * DAYS_IN_WEEK + days;
    const daysPremature = FULL_TERM_WEEKS * DAYS_IN_WEEK - totalGestationDays;

    const chronologicalAgeDays = differenceInDays(today, birth);
    const correctedAgeDays = chronologicalAgeDays - daysPremature;

    if (correctedAgeDays <= 0) {
      const totalDaysPregnant = totalGestationDays + chronologicalAgeDays;
      const currentWeeks = Math.floor(totalDaysPregnant / DAYS_IN_WEEK);
      const currentDays = totalDaysPregnant % DAYS_IN_WEEK;

      setAgeToShow(`שבוע ${currentDays}+${currentWeeks} להריון`);
      setIsCalculated(true);
      return;
    }

    const totalMonths = Math.floor(correctedAgeDays / 30);
    const remainingDays = correctedAgeDays % 30;
    const weeksRemaining = Math.floor(remainingDays / 7);
    const daysRemaining = remainingDays % 7;

    let ageString = '';

    if (totalMonths < 6) {
      const totalWeeks = Math.floor(correctedAgeDays / 7);
      const remainingDays = correctedAgeDays % 7;

      if (totalWeeks > 0)
        ageString += totalWeeks === 1 ? 'שבוע אחד' : `${totalWeeks} שבועות`;
      if (remainingDays > 0) {
        if (totalWeeks > 0) ageString += ', ';
        ageString += remainingDays === 1 ? 'יום אחד' : `${remainingDays} ימים`;
      }
    } else {
      if (totalMonths > 0)
        ageString += totalMonths === 1 ? 'חודש אחד' : `${totalMonths} חודשים`;
      if (weeksRemaining > 0) {
        if (totalMonths > 0) ageString += ', ';
        ageString +=
          weeksRemaining === 1 ? 'שבוע אחד' : `${weeksRemaining} שבועות`;
      }
      if (daysRemaining > 0) {
        if (totalMonths > 0 || weeksRemaining > 0) ageString += ', ';
        ageString += daysRemaining === 1 ? 'יום אחד' : `${daysRemaining} ימים`;
      }
    }

    if (!ageString) ageString = '0 ימים';

    ageString = formatCommas(ageString);

    setAgeToShow(ageString);
    setIsCalculated(true);
  };
  const rtlStyles: React.CSSProperties = {
    direction: 'rtl',
    textAlign: 'right',
  };

  return (
    <Container className="mt-4" style={rtlStyles}>
      <div className="bg-white p-4 rounded shadow">
        <h1 className="text-center calculator-title mb-4">חישוב גיל מתוקן</h1>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="birthDate">
            <Form.Label column sm={4}>
              תינוקכם נולד בתאריך:
            </Form.Label>
            <Col sm={8}>
              <DatePicker
                selected={birthDate}
                onChange={(date: Date | null) => setBirthDate(date)}
                dateFormat="dd/MM/yyyy"
                locale="he"
                placeholderText="בחר/י תאריך"
                className="form-control"
                maxDate={new Date()}
                popperProps={{ strategy: 'fixed' }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="gestationWeek">
            <Form.Label column sm={4}>
              בשבוע הריון:
            </Form.Label>
            <Col sm={4}>
              <Form.Control
                type="number"
                min={20}
                max={44}
                value={gestationWeeks}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 44) {
                    setGestationWeeks(e.target.value);
                  }
                }}
                placeholder="שבוע לידה"
              />
            </Col>
            <Col sm={4}>
              <Form.Control
                type="number"
                min={0}
                max={6}
                value={gestationDays}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= 0 && value <= 6) {
                    setGestationDays(e.target.value);
                  }
                }}
                placeholder="+ימים"
              />
            </Col>
          </Form.Group>
          <div className="d-grid">
            <Button
              className="btn-custom-green"
              onClick={() =>
                calculateAge(birthDate, gestationWeeks, gestationDays)
              }
              disabled={!isInputValid()}
            >
              חשב גיל מתוקן
            </Button>
          </div>
          {isCalculated && (
            <div className="mt-3 text-center">
              <p className="fw-bold text-success">גיל מתוקן: {ageToShow}</p>
            </div>
          )}
        </Form>
      </div>
    </Container>
  );
}
