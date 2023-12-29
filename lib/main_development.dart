import 'package:injectable/injectable.dart';
import 'package:whispering_stars_website/bootstrap.dart';
import 'package:whispering_stars_website/injection.dart';
import 'package:whispering_stars_website/presentation/core/app.dart';

Future<void> main() async {
  await configureInjection(Environment.dev);

  await bootstrap(() => const App());
}
