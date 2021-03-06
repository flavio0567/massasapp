import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useDispatch, connect } from 'react-redux';
import { View, StatusBar, Alert, Platform } from 'react-native';
import { ptBR } from 'date-fns/locale';
import { format, getHours } from 'date-fns';

import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getHolidays from '../../../../shared/utils/getHolidays';

import { useAuth } from '../../../../shared/hooks/auth';

import { useDeliveryDateTime } from '../../../../shared/hooks/deliveryDateTime';

import * as CartActions from '../../../../store/modules/cart/actions';

import { Hours } from '../../../../util/hours';

import {
  Container,
  SelectButton,
  Header,
  DeliveryInfo,
  DeliveryUserView,
  DeliveryUserInputView,
  DeliveryUserInput,
  DeliveryMobileInput,
  DeliveryUserLabelText,
  ChevronIcon,
  ContentDateTime,
  Calendar,
  DateTimeSection,
  OpenDataPickerButton,
  OpenDataPickerButtonText,
  ConfirmButton,
  StartusBarText,
  Schedule,
  InfoLabelText,
  HourLabelText,
  InfoHourText,
  Section,
  SectionContent,
  Hour,
  HourText,
} from './styles';

const DateTimeDelivery: React.FC = () => {
  const { reset, navigate, goBack } = useNavigation();
  // const [token, setToken] = useState<string | null>();

  const formRef = useRef<FormHandles>(null);

  const { user, deliveryData } = useAuth();

  const [deliveryUser, setDeliveryUser] = useState<string>();
  const [deliveryUserMobile, setDeliveryUserMobile] = useState<string>();

  const [selectedHour, setSelectedHour] = useState(0);

  const dispatch = useDispatch();

  const { setDateTime } = useDeliveryDateTime();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      setDeliveryUser(user.name);
      setDeliveryUserMobile(String(user.mobile));
    }
  }, [user]);

  // useEffect(() => {

  //   const response = await api.post('sessions', {
  //     mobile,
  //     password,
  //   });

  //   const { token, user } = response.data;

  //   async function getToken(): Promise<void> {
  //     const userToken = await AsyncStorage.getItem('@Massas:token');

  //     if (!userToken) {
  //       await AsyncStorage.multiSet([
  //         ['@Massas:token', token],
  //         ['@Massas:user', JSON.stringify(user)],
  //       ]);

  //       api.defaults.headers.authorization = `Bearer ${token}`;

  //   setData({ token, user, mobile });
  //     }

  //     setToken(userToken);
  //   }

  //   getToken();
  // }, []);

  const deliveryAvailability = useMemo(() => {
    deliveryDate.setHours(0);
    deliveryDate.setMinutes(0);

    const formattedDate = format(deliveryDate, 'eeee, d, MMMM', {
      locale: ptBR,
    });

    const today = format(new Date(), 'eeee, d, MMMM', {
      locale: ptBR,
    });

    function remove(str: string, startIndex: number): any {
      return str.substr(0, startIndex);
    }

    const myIndex = formattedDate.search(',');

    const weekDay = remove(formattedDate, myIndex);

    let startHour = String('');
    let endHour = String('');
    let available = true;

    const holidays = getHolidays(format(deliveryDate, 'dd/MM/yyyy'));

    let result;
    const isHoliday = holidays.map((date: string, i: number) => {
      if (date.data === format(deliveryDate, 'dd/MM/yyyy')) {
        result = date;
      } else {
        result = false;
      }
      return result;
    });
    if (weekDay) {
      if (isHoliday[Number(format(deliveryDate, 'MM')) - 1]) {
        startHour = '00:00';
        endHour = '00:00';
      } else if (weekDay === 'sábado') {
        startHour = '08:00';
        endHour = '15:00';
      } else if (weekDay === 'domingo') {
        startHour = '08:00';
        endHour = '12:00';
      } else if (weekDay === 'segunda') {
        startHour = '00:00';
        endHour = '00:00';
      } else if (format(deliveryDate, 'dd/MM') === '23/12') {
        startHour = '00:00';
        endHour = '00:00';
      } else if (format(deliveryDate, 'dd/MM') === '24/12') {
        startHour = '00:00';
        endHour = '00:00';
      } else {
        startHour = '09:00';
        endHour = '17:00';
      }
    }

    return Hours.filter(
      ({ hour }) =>
        hour >= Number(startHour.slice(1, 2)) &&
        hour <= Number(endHour.slice(0, 2)),
    ).map(({ hour }) => {
      const num = Number(getHours(new Date()));
      if (formattedDate === today) {
        if (hour > num) {
          available = true;
        } else {
          available = false;
        }
      }

      return {
        hour,
        available,
        hourFullFormatted: format(new Date().setHours(hour), 'HH:00'),
      };
    });
  }, [deliveryDate]);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setDeliveryDate(date);
      }
    },
    [],
  );

  const handleConfirmDateTime = useCallback(async () => {
    if (!deliveryUser || !deliveryUserMobile) {
      Alert.alert(
        'Informe os dados do pedido:',
        'Para prosseguir informe o nome e número do celular.',
      );
      setDeliveryDate(new Date());

      return;
    }

    if (!selectedHour) {
      Alert.alert(
        'Selecione data e horário para delivery/retirada:',
        'Para prosseguir escolha data/hora para delivery/retirada.',
      );
      setDeliveryDate(new Date());

      return;
    }

    await deliveryData(deliveryUserMobile, deliveryUser);

    let deliveryDateTime;

    try {
      const time = format(new Date().setHours(selectedHour), 'HH:00');

      const date = new Date(deliveryDate);

      date.setHours(selectedHour);
      date.setMinutes(0);
      setDeliveryDate(date);

      deliveryDateTime = {
        deliveryDate: date,
        deliveryTime: time,
      };
    } catch (err) {
      Alert.alert(
        'Erro ao criar o agendamentp:',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente.',
      );
    }

    dispatch({
      type: '@order/ADD_DATE_TIME',
      deliveryDateTime,
    });

    await AsyncStorage.removeItem('@Massas:deliveryDateTime');

    AsyncStorage.setItem(
      '@Massas:deliveryDateTime',
      JSON.stringify(deliveryDateTime),
    );

    setDateTime(deliveryDateTime);

    reset({
      index: 0,
      routes: [{ name: 'MainStack' }],
    });

    navigate('MainStack');
  }, [
    reset,
    dispatch,
    navigate,
    setDateTime,
    deliveryDate,
    selectedHour,
    deliveryUser,
    deliveryUserMobile,
    deliveryData,
  ]);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleUser = useCallback(
    async (userName: string) => {
      setDeliveryUser(userName);
      await deliveryData(deliveryUserMobile, userName);
    },
    [deliveryData, deliveryUserMobile],
  );

  return (
    <Container accessible>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <SelectButton onPress={() => goBack()} accessibilityTraits="button">
            <ChevronIcon name="chevron-left" size={22} />
          </SelectButton>

          <StatusBar backgroundColor="#FD9E63" />
          <StartusBarText
            allowFontScaling={false}
            accessibilityLabel="Horário de entrega"
          >
            Horário da entrega
          </StartusBarText>
        </Header>
      </View>

      <DeliveryInfo>
        <DeliveryUserView>
          <InfoLabelText
            allowFontScaling={false}
            accessibilityLabel="Informações do pedido"
          >
            Informações do pedido
          </InfoLabelText>

          <Form ref={formRef} onSubmit={handleUser}>
            <DeliveryUserInputView>
              <DeliveryUserLabelText
                allowFontScaling={false}
                accessibilityLabel="Nome"
              >
                <Icon name="user" color="#fff" /> Nome:{' '}
              </DeliveryUserLabelText>
              <DeliveryUserInput
                allowFontScaling={false}
                onChangeText={(userName: string) => setDeliveryUser(userName)}
                autoCorrect={false}
                keyboardType="default"
                returnKeyType="next"
              >
                {deliveryUser}
              </DeliveryUserInput>
            </DeliveryUserInputView>
            <DeliveryUserInputView>
              <DeliveryUserLabelText
                allowFontScaling={false}
                accessibilityLabel="Celular"
              >
                <Icon name="phone" color="#fff" /> Celular:{' '}
              </DeliveryUserLabelText>
              <DeliveryMobileInput
                allowFontScaling={false}
                type="cel-phone"
                keyboardType="numeric"
                placeholder="(99) 99999-9999"
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                value={deliveryUserMobile}
                onChangeText={(userMobile: string) =>
                  setDeliveryUserMobile(userMobile)
                }
                returnKeyType="done"
              />
            </DeliveryUserInputView>
          </Form>
        </DeliveryUserView>
      </DeliveryInfo>

      <ContentDateTime>
        <Calendar>
          <OpenDataPickerButton onPress={handleToggleDatePicker}>
            <OpenDataPickerButtonText
              allowFontScaling={false}
              accessibilityLabel="Escolha a data"
              accessibilityTraits="button"
            >
              Escolha a data
            </OpenDataPickerButtonText>
          </OpenDataPickerButton>

          {showDatePicker && (
            <DateTimeSection>
              <View>
                <DateTimePicker
                  locale="pt-BR"
                  mode="date"
                  onChange={handleDateChanged}
                  textColor="#FD9E63"
                  value={deliveryDate}
                  minimumDate={new Date()}
                  accessibilityTraits="selected"
                />
              </View>
            </DateTimeSection>
          )}
        </Calendar>

        <Schedule>
          <HourLabelText
            allowFontScaling={false}
            accessibilityLabel="Escolha o horário"
          >
            Escolha o horário
            <InfoHourText>
              {'   '}
              arraste para mais horários ➢
            </InfoHourText>
          </HourLabelText>
          <Section>
            <SectionContent>
              {deliveryAvailability.map(
                ({ hourFullFormatted, hour, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    available={available}
                    key={hourFullFormatted}
                    onPress={() => {
                      handleSelectHour(hour);
                    }}
                  >
                    <HourText
                      allowFontScaling={false}
                      selected={selectedHour === hour}
                      accessibilityTraits="button"
                    >
                      {hourFullFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>
        <ConfirmButton onPress={handleConfirmDateTime}>
          <OpenDataPickerButtonText
            allowFontScaling={false}
            accessibilityLabel="Confirmar"
            accessibilityTraits="button"
          >
            Confirmar
          </OpenDataPickerButtonText>
        </ConfirmButton>
      </ContentDateTime>
    </Container>
  );
};

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(DateTimeDelivery);
