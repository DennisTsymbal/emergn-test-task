import { expect } from 'chai';
import { binding, given, then, when } from 'cucumber-tsflow';
import {CookieJar} from 'tough-cookie';
import got from 'got';
import util from 'util';
//const { Binding, Given, When, Then } = require("cucumber");

@binding()
export class TestingSteps {
  public website: string = 'https://www.github.com/';
  public cookie1: string = '';
  public cookie2: string = '';
  public cookie3: string = '';
  public cleanCookieJar: string[] = new Array();

  @given  (/^A set of three cookies$/) 
  public SetCookies() {  
    this.cookie1 = 'firstCookieKey=firstCookieValue';
    this.cookie2 = 'secondCookieKey=secondCookieValue';
    this.cookie3 = 'thirdCookieKey=thirdCookieValue';
  }

  @when(/^Three Cookies are set up$/)
  public GetCookies() {
    let cookieJar = new CookieJar();
    const setCookie = util.promisify(cookieJar.setCookie.bind(cookieJar));
    setCookie(this.cookie1, this.website);
    setCookie(this.cookie2, this.website);
    setCookie(this.cookie3, this.website);
    got(this.website, {cookieJar});
    this.cleanCookieJar = Object.assign(this.cleanCookieJar, cookieJar);
  }
  @when(/^One Cookie is deleted$/)
  public deleteOneCookie(){
    let assertCookieJar: string[] = new Array();
    clean(this.cleanCookieJar, "firstCookieKey");
    assertCookieJar = Object.assign(assertCookieJar, this.cleanCookieJar);
  }

  @then(/^Two Cookies left$/)
  public assertCookiesRemoved() {
    let assertCookieJar: string[] = new Array();
    expect(assertCookieJar).to.include('secondCookieKey');
    expect(assertCookieJar).to.include('thirdCookieKey');
    console.log('test text');
    expect(assertCookieJar).to.not.include('firstCookieKey');
  }
}

function clean(obj: {[x: string]: any;},target: string)
{
  var tmpobj = obj;
  for (var key in tmpobj) {
    if (key === target) {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      obj[key] = clean(obj[key], target);
    }
  }
  return obj;
}
