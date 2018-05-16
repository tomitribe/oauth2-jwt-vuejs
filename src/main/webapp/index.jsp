<!DOCTYPE html>
<!--
Licensed to the Apache Software Foundation (ASF) under one or more
contributor license agreements. See the NOTICE file distributed with
this work for additional information regarding copyright ownership.
The ASF licenses this file to You under the Apache License, Version 2.0
(the "License"); you may not use this file except in compliance with
the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
-->
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Moviefun</title>
  <link href="<c:url value='/webjars/bootstrap/4.1.0/css/bootstrap.min.css'/>" rel="stylesheet">
  <link href="<c:url value='/webjars/font-awesome/5.0.10/web-fonts-with-css/css/fontawesome-all.min-jsf.css'/>" rel="stylesheet">
  <link href="<c:url value='/assets/less/app.less'/>" rel="stylesheet/less" type="text/css">
  <script type="text/javascript">
    window.ux = window.ux || {};
    window.ux.SESSION_ID = "<%=request.getSession().getId()%>";
    window.ux.ROOT_URL = "<c:url value='/'/>".replace(';jsessionid=' + window.ux.SESSION_ID, '');
    //window.tokenHost = "http://localhost:8080/oauth2/token";
  </script>
  <base href="<c:url value='/'/>">
</head>
<body>
    <div id="root">
    </div>
    <script src="<c:url value='/webjars/less/2.7.2/less.min.js'/>"></script>
    <script src="<c:url value='/webjars/jquery/3.3.1/jquery.min.js'/>"></script>
    <script src="<c:url value='/webjars/bootstrap/4.1.0/js/bootstrap.bundle.min.js'/>"></script>
    <script src="<c:url value='/webjars/pako/1.0.6/dist/pako.min.js'/>"></script>
    <script src="<c:url value='/assets/js/common/md5.min.js'/>"></script>
    <script src="https://unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
    <script src="https://unpkg.com/vue@2/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router@2/dist/vue-router.js"></script>
    <script src="https://unpkg.com/vuex@3/dist/vuex.js"></script>
    <script src="https://unpkg.com/axios@0/dist/axios.min.js"></script>
    <script src="https://unpkg.com/http-vue-loader@1"></script>
    <script src="https://unpkg.com/vue-toasted@1"></script>
    <script src="https://unpkg.com/vuelidate@0/dist/vuelidate.min.js"></script>
    <script src="https://unpkg.com/vuelidate@0/dist/validators.min.js"></script>
    <script src="<c:url value='/assets/js/start.js'/>" charset="utf-8" type="module"></script>
</body>
</html>
