** TO RUN **
1) Make sure you run yarn to install all the dependencies
2) From the root folder, simply type:

  $ node server/server.js

3) open the browser at the following address:

  http://localhost:3000


** TO RUN TESTS **
1) From the root folder, simply type:

  $ mocha -R spec ./server/server.spec.js


** TIME TO SOLVE THE TEST **
More than 2 hours (BTW, does it ever happen these tests take just 2 hours? Really??)
Overall, I spent 2 evenings on it.


** TESTING **
Used Node v9.6.1
Tested with Chrome Version 65.0.3325.181 and Safari Version 11.0.3 under macOs Sierra


** DESIGN CHOICES **
1) In order to be compliant with REST architecture, I took the liberty to slightly modify the the /results API requirement, by adding the query param to the URL, so that every query is identifiable by a unique URL.

2) Used ES6 and new features of CSS (such as variable). Obviously this makes the test non compatible with older browser, but - hey - if we don't try this features when doing tests, where's the fun?

3) To do rendering of the pages I used Vue.js as it provides a very simple templating mechanism and can be embedded in the page with a simple <script /> tag. I am aware I was suggested not to, but I think the overall message was 'do not overcomplicate the solution', which I didn't (I just picked up a rendering engine and used it out of the box)

4) The URL for all the images were wrong, so I took new ones from the Zoopla website

5) test done in Mocha. In an ideal world I would have also tested this doing e2e tests with Knightwatch


** SUGGESTIONS AND ADDITIONAL NOTES **
The test is good, I think it covers all areas of frontend development.

I would suggest to clarify the following items in the test:

1) it is not 100% clear if you expect the server to return rendered pages, or if it is allowed to do the rendering client side. From the scenarios written, I deducted you were expecting the rendering to happen on client side (at least for the results), so I ended up using Vue.js

2) it is not clear whether the /results route is an API or a rendered page. Personally I think the proper approach should follow REST pricinples, therefore:
- /results route would be an API, returning json
- the address should be uniquely associated to a search query
