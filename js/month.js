// https://carrotweb.tistory.com/164?category=1076250
$(function(){
  let date = new Date();
  let thisYear = date.getFullYear();
  let thisLastMonth = date.getMonth(); //+1 해야 이번달
  let thisDay = date.getDate();
  console.log(thisYear,thisLastMonth+1,thisDay);
  function calendar(date){

    /*날짜를 기준으로 월의 마지막 일자 구하는 방법*/

    // 방법 1) 월별 마지막 일자 배열과 윤년 계산
    // const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // // 윤년 계산
    // if (calendarYear % 400 == 0) {
      // monthDays[1] = 29;
    // } else if (calendarYear % 100 == 0) {
        // monthDays[1] = 28;
      // } else if (calendarYear % 4 == 0) {
        // 	monthDays[1] = 29;
        // }

    // // 달력 월의 마지막 일
    // var calendarMonthLastDate = monthDays[date.getMonth()];
    //
    // console.log(calendarMonthLastDate);
    // --> 31

    //방법 2) 생성자로 Date 객체를 생성
    let getLastMonthDate = new Date(thisYear, thisLastMonth, 0);
    console.log(getLastMonthDate);
    let getLastMonthDay = getLastMonthDate.getDate();
    console.log(getLastMonthDay);
    let getThisMonthDay = new Date(thisYear, thisLastMonth+1, 0).getDate();
    console.log(getThisMonthDay);
    let startDate = new Date(thisYear, thisLastMonth, 1);
    let startDayWeek = startDate.getDay()-1; //월요일부터 시작
    console.log(startDayWeek);

    /*달력 만들기*/

    let weekCount = Math.ceil((startDayWeek + getLastMonthDay) / 7);
    console.log(weekCount);

    $('.calendar-year').html(thisYear);
    $('.calendar-month').html(thisLastMonth+1);
    console.dir(document.getElementsByClassName('calendar-yearmonth'));

    let today = new Date();

    let elem = document.getElementById('calendar');
    let calendarTable = '';
    calendarTable += '<table>';
    calendarTable += '<tr><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th><th>S</th></tr>'
    let calendarPos = 0; //위치
    let calendarDay = 0; //날짜
    for( let i = 0; i < weekCount; i++ ) {
      calendarTable += '<tr>';
      for( let j = 0; j < 7; j++ ) {
        calendarTable += '<td>';
        if ( startDayWeek <= calendarPos && calendarDay < getThisMonthDay ) {
          calendarDay++;
          calendarTable += '<span class="'
          if( thisYear == today.getFullYear() && thisLastMonth+1 == today.getMonth()+1 && thisDay == today.getDate() ) {
            calendarTable += 'today';
          }
          if ( calendarDay == thisDay ) {
            calendarTable += ' today-bg';
          }
          calendarTable += `">${calendarDay}</span>`;
        }
        calendarTable += '</td>';
        calendarPos++;
      }
      calendarTable += '</tr>';
    }
    calendarTable += '</table>';
    elem.innerHTML = calendarTable;

    let tdParent = $('.today-bg').parent();
    tdParent.css('backgroundColor','rgba(242, 177, 53, .5)');
  }
  calendar(new Date());

  //월 이동 버튼
  // 이전 달 이동 버튼 클릭
  function prevMonth(){
    date.setMonth(date.getMonth() - 1);
    calendar(new Date());
    }

  function nextMonth(){
    date.setMonth(date.getMonth() + 1);
    calendar(new Date());
  }

  function goToday(){
    date = new Date();
    calendar(date);
  }

  $('.prev-btn').click(prevMonth);
});
