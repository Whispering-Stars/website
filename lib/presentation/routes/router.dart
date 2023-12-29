import 'package:auto_route/auto_route.dart';
import 'package:whispering_stars_website/presentation/home/home_page.dart';
import 'package:whispering_stars_website/presentation/splash/splash_page.dart';
import 'package:whispering_stars_website/utils/constants/router.dart';

part 'router.gr.dart';

@AutoRouterConfig()
class AppRouter extends _$AppRouter {
  AppRouter() : super();

  @override
  RouteType get defaultRouteType => const RouteType.adaptive();

  @override
  late final List<AutoRoute> routes = [
    AutoRoute(
      page: HomeRoute.page,
      path: homePagePath,
    ),
    AutoRoute(
      page: SplashRoute.page,
      path: splashPagePath,
    ),
  ];
}
