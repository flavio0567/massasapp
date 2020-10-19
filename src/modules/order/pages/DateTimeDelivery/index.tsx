/* eslint-disable import/no-duplicates */
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
  Section,
  SectionContent,
  Hour,
  HourText,
} from './styles';

const DateTimeDelivery: React.FC = () => {
  const { reset, navigate, goBack } = useNavigation();

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

    if (weekDay) {
      if (weekDay === 'sábado') {
        startHour = '08:00';
        endHour = '16:30';
      } else if (weekDay === 'domingo') {
        startHour = '08:00';
        endHour = '12:30';
      } else {
        startHour = '09:00';
        endHour = '18:00';
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
    if (!selectedHour) {
      Alert.alert(
        'Selecione data e horário para delivery/retirada:',
        'Para prosseguir escolha data/hora para delivery/retirada.',
      );
      setDeliveryDate(new Date());

      return;
    }

    if (!deliveryUser || !deliveryUserMobile) {
      Alert.alert(
        'Informe os dados do pedido:',
        'Para prosseguir informe o nome e número do celular.',
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
    <Container>
      <View
        style={{
          backgroundColor: '#FD9E63',
          height: hp('10%'),
        }}
      >
        <Header>
          <SelectButton onPress={() => goBack()}>
            <ChevronIcon name="chevron-left" size={22} />
          </SelectButton>

          <StatusBar backgroundColor="#FD9E63" />
          <StartusBarText>Horário da entrega</StartusBarText>
        </Header>
      </View>

      <DeliveryInfo>
        <DeliveryUserView>
          <InfoLabelText>Informações do pedido</InfoLabelText>

          <Form ref={formRef} onSubmit={handleUser}>
            <DeliveryUserInputView>
              <DeliveryUserLabelText>
                <Icon name="user" color="#fff" /> Nome:{' '}
              </DeliveryUserLabelText>
              <DeliveryUserInput
                onChangeText={(userName: string) => setDeliveryUser(userName)}
                autoCorrect={false}
                keyboardType="default"
                autoFocus
                returnKeyType="next"
              >
                {deliveryUser}
              </DeliveryUserInput>
            </DeliveryUserInputView>
            <DeliveryUserInputView>
              <DeliveryUserLabelText>
                <Icon name="phone" color="#fff" /> Celular:{' '}
              </DeliveryUserLabelText>
              <DeliveryMobileInput
                type="cel-phone"
                keyboardType="numeric"
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
            <OpenDataPickerButtonText>Escolha a data</OpenDataPickerButtonText>
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
                  // minuteInterval={15}
                  // minimumDate={deliveryDate}
                  minimumDate={new Date()}
                />
              </View>
            </DateTimeSection>
          )}
        </Calendar>

        <Schedule>
          <HourLabelText>Escolha o horário </HourLabelText>

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
                    <HourText selected={selectedHour === hour}>
                      {hourFullFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>
        <ConfirmButton onPress={handleConfirmDateTime}>
          <OpenDataPickerButtonText>Confirmar</OpenDataPickerButtonText>
        </ConfirmButton>
      </ContentDateTime>
    </Container>
  );
};

const mapDispatchToProps = (dispatch: any): any =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(DateTimeDelivery);
