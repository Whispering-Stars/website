import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:injectable/injectable.dart';
import 'package:whispering_stars_website/utils/constants/core.dart';

part 'core_cubit.freezed.dart';
part 'core_state.dart';

@injectable
class CoreCubit extends Cubit<CoreState> {
  CoreCubit() : super(CoreState.initial());

  void changeTitle(String title) {
    emit(state.copyWith(title: '$baseTitle | $title'));
  }
}
