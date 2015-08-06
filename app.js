var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var escaper = require("true-html-escape");
var app = express();

app.get('/zhihu/list/',function(req,res,next){
    // 用 superagent 去抓取 http://daily.zhihu.com/ 的内容
    superagent.get('http://daily.zhihu.com/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.col-lg-4 .link-button').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    href: $element.attr('href'),
                    img:$element.find('img').attr('src'),
                    title:$element.find('span').text()
                });
            });
            res.jsonp(items);
        });
});

app.get('/zhihu/detail/',function(req,res,next){
    res.header("Content-Type", "application/json; charset=utf-8");
    var url = req.query.url;
    // 用 superagent 去抓取 http://daily.zhihu.com/ 的内容
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var result = {};
            result.content = escaper.unescape($('.content').html());
            result.title = escaper.unescape($('#title').html());
            res.jsonp(result);
        });
});

app.get('/douban/list/',function(req,res,next){
    // 用 superagent 去抓取 http://daily.zhihu.com/ 的内容
    superagent.get('http://moment.douban.com/app/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#selection li').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    href: $element.find('a').attr('href'),
                    detail:$element.find('.abstract').text(),
                    title:$element.find('h3').text()
                });
            });
            res.jsonp(items);
        });
});

app.get('/douban/detail/',function(req,res,next){
    res.header("Content-Type", "application/json; charset=utf-8");
    var url = req.query.url;
    // 用 superagent 去抓取 http://daily.zhihu.com/ 的内容
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var result = {};
            result.content = escaper.unescape($('#content').html());
            result.title = escaper.unescape($('#title').html());
            result.srcs = [];
            result.imgs = [];
            $('#content').find('.content_img').each(function (idx, element) {
                result.imgs.push(escaper.unescape($(this).html()));
            });
            $('#content').find('img').each(function (idx, element) {
                result.srcs.push(escaper.unescape($(this).attr('src')));
            });
            res.jsonp(result);
        });
});

app.get('/one/list/',function(req,res,next){
    // 用 superagent 去抓取 http://daily.zhihu.com/ 的内容
    superagent.get('http://wufazhuce.com/one/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.corriente').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    href: $element.find('a').attr('href'),
                    img:$element.find('img').attr('src')
                });
            });
            res.jsonp(items);
        });
});

app.get('/one/detail/',function(req,res,next){
    res.header("Content-Type", "application/json; charset=utf-8");
    var url = req.query.url;
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var result = {};
            result.img = $('.one-imagen').find('img').attr('src');
            result.content = escaper.unescape($('.one-cita').html());
            res.jsonp(result);
        });
});

app.get('/yiwen/detail/',function(req,res,next){
    res.header("Content-Type", "application/json; charset=utf-8");
    //http://www.meiriyiwen.com/
    var url = req.query.url;
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var result = {};
            result.title = $($('h1')[0]).text();
            result.content = escaper.unescape($('.article_text').html());
            res.jsonp(result);
        });
});


app.get('/dili/list/',function(req,res,next){
    // 用 superagent 去抓取 http://daily.zhihu.com/ 的内容
    superagent.get('http://www.nationalgeographic.com.cn/')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#indexLbox .box').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    href: $element.find('a').attr('href'),
                    img:$element.find('img').attr('src'),
                    title:$element.find('h3').text(),
                    detail:$element.find('p').text()
                });
            });
            res.jsonp(items);
        });
});

app.get('/dili/detail/',function(req,res,next){
    res.header("Content-Type", "application/json; charset=utf-8");
    var url = req.query.url;
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var result = {};
            result.title = $('.title').text();
            result.content = escaper.unescape($('.del-bottom').html());
            res.jsonp(result);
        });
});

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log('app server start 3000');
});