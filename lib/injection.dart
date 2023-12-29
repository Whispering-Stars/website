import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:whispering_stars_website/injection.config.dart';

final getIt = GetIt.instance;

@InjectableInit()
Future<void> configureInjection(String env) async =>
    getIt.init(environment: env);
