part of 'core_cubit.dart';

@freezed
sealed class CoreState with _$CoreState {
  const factory CoreState({
    required String title,
  }) = _CoreState;

  factory CoreState.initial() => const CoreState(
        title: baseTitle,
      );
}
